module.exports = async function (context, req) {
    const axios = require('axios').default;
    const { BlobServiceClient } = require("@azure/storage-blob");
    const { createCanvas, loadImage } = require("canvas");
    const sizeOf = require('image-size');


    MODEL_URL = 'https://hackatum-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/fe21f652-527a-44bd-ab50-989192c0e2de/detect/iterations/Iteration3/url'

    Prediction_Key = '0cdce04e60584ae8837a7947acf31a4b'
    context.log('JavaScript HTTP trigger function processed a request.');

    const images = req.body.images
    const client = new BlobServiceClient('https://storehackatumteam4.blob.core.windows.net/?sv=2020-08-04&ss=bfqt&srt=sco&sp=rwdlacupitfx&se=2021-11-22T18:56:32Z&st=2021-11-20T10:56:32Z&spr=https&sig=HIRfIYh9W8r%2BHVrSpBmtUhl%2FA2oAP9r2e%2FV%2BIOqsaCA%3D')
    const containerClient = client.getContainerClient('hackatum');

    const url_lists = []
    const imgSizes = []

    const run_model = async (url) => {
        return axios.post(MODEL_URL, data = {
            'Url': url
        }, {
            headers: {
                'Prediction-Key': Prediction_Key, 
                'Content-Type': 'application/json'
                }
            })
    }

    const getMarkedImage = async (url, img_size, boxes) => {
        if (boxes.length == 0) {
            return ""
        }
        const canvas = createCanvas(img_size['width'], img_size['height']);
        const ctx = canvas.getContext('2d');
        const img = await loadImage(url);
        
        ctx.drawImage(img, 0, 0, img_size['width'], img_size['height']);
        boxes.forEach(box => {
            ctx.beginPath();
            ctx.rect(
                box.boundingBox.left * img_size['width'],
                box.boundingBox.top * img_size['height'],
                box.boundingBox.width * img_size['width'],
                box.boundingBox.height * img_size['height']);

            ctx.strokeStyle = 'green';
            ctx.lineWidth = 8;
            ctx.stroke();
        })

        boxes.forEach(box => {
            const prob = (box['probability'] * 100).toFixed(2) + '%'
            ctx.font = '15px Arial';
            ctx.fillStyle = 'white';
            ctx.fillText(prob,
                        box.boundingBox.left * img_size['width'],
                        box.boundingBox.top * img_size['height'] + 15);
        })
        
        const buffer = canvas.toBuffer('image/png');
        const imageName = `marked-image-${new Date().toISOString()}.png`
        const imageBlob = containerClient.getBlockBlobClient(imageName)
        await imageBlob.uploadData(buffer)
        context.log(imageBlob.url)
        return imageBlob.url
    }

    for (const image of images) {
        const imageName = `original-image-${new Date().toISOString()}.png`
        const imageBlob = containerClient.getBlockBlobClient(imageName)
        const imageBlobBuffer = Buffer.from(image.split(';base64,').pop(), 'base64')
        await imageBlob.uploadData(imageBlobBuffer)
        const imageUrl = imageBlob.url

        const size = sizeOf(imageBlobBuffer)

        url_lists.push(imageUrl)
        imgSizes.push(size)
    }

    async function makeFinalResult(url_lists, imgSizes) {
        const result = await Promise.all(url_lists.map(run_model))

        const marketImages = await result
                                    .map((el, i) => {
                                        let boxList = []
                                        boxList = el.data.predictions.filter(item => item['probability'] > 0.96)
                                        return getMarkedImage(url_lists[i], imgSizes[i], boxList)
                                    })

        const finalResult = await Promise.all(marketImages)
        return finalResult.map((el, i) => {
            context.log(el)
            return {
                originalUrl: url_lists[i],
                markedUrl: el
            }
        })
    }

    var makeResult = await makeFinalResult(url_lists, imgSizes)

    return {
        // status: 200, /* Defaults to 200 */
        body: makeResult
    }
    
}