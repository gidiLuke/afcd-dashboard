## Inspiration
**Humankind was waiting for it long enough We detect scratches on chips.**
Our challenge is simple: There shall not be any faulty chips! 

## What it does
We detect if a chip is faulty and add a bounding box to the image. Everything is displayed in a user-friendly dashboard, also showing some overall statistics and allowing you to upload your own images that are fed to our model.

## Challenges we ran into
The main challenges we ran into: 
* Limited training data
* Raw training data
* Unlabeled training data
* Building a user-friendly UI

## How we built it
We used Microsoft Azure's Custom Vision to detect the scratches on the images.
For training, we applied various preprocessing techniques to ensure the generalizability of the limited training sample such as:
* Adding rotation
* Flipping
* Changing the gamma parameters
* Changing the brightness
* Adding noise
* Affine transformation

Also, we manually drew more scratches on some chips allowing even more general predictions.

## Accomplishments that we're proud of
Our model is very accurate and also has a high recall. (both over 90%). Also, our prototype is coded from beginning to end - and works!

## What we learned
Microsoft Azure's Custom Vision actually delivers decent results, despite the little customizability. 

## What's next for AFCD
It would be awesome to implement the model into the real-time image feed of chip production. 
