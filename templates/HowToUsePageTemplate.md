# How to use templates

## Contents
- **Resource Preparation**: A list of resources and how to prepare them
- **Page/Code Modification**: what changes/additions need to be made to the code

## Resource Preparation
each page needs a specific set of resources to be built, this include the following:
- **Text**: english text for the page, this will need to be stored as a .txt file with all the data on a single line.
this should be placed in the /resources/text folder and named after the appropriate art piece
- **Audio Recording**: A audio recording of the text on the page, this will need to be formated as an .mp3 file. this should be placed in the /resources/audio folder and named after the appropriate art piece
- **Art Work Image**: An Image of the art work, preferebly as a .png file with progressive formating enabled (this will alow it to load in a lower resolution first). this should be placed in the /resources/images/artworks folder and named after the appropriate art piece
- **Art Work Map** : last of all, all of the maps for the tour will need to be remade to include the new artpiece (unless the new art piece is in the exact same location as another artpiece then you can skip this step and use the same map as the other artwork in that location).
  
  to do this you will need to create new maps using the oringinal file they were derived from, it is named: TGAMapFile.xcf (this was oringinaly made in GIMP but a 
  .psd version was also created from that will also probably work if you prefer to use photoshop).
  
  from here create copy of the markers that are being used and move the new markers to the location of the new artpiece
  (they should be in a layer folder called fixed locations, which is not set as visible)
  from here export the new version of the map as a .png following the naming of the prexisting files that will need to be replaced
  (that is "TGAMapA.png", "TGAMapB.png", etc.). each of these maps will need to have different markers visibility turned on or off to show markers at different locations, as well as one with none of the markers on for the home page. make sure that when doing this the new maps reffer to the same locations as the old ones (that is to say "TGAMapA.png" will still be the map with no location being selected as it is for the home page, "TGAMapB.png" will still be the map showing the location of the "te poutokomanawa", and so on).
  
  alternatively a copy of the blank map with no markers on it has been included (TGAMapBLANK.png) and this can be used to reproduce the maps from scratch.
  (again making sure the names of the produced files ("TGAMapA.png", "TGAMapB.png", etc.) match up to the same locations).
  
  after these new maps are created they should be placed in the /resources/images/maps folder, replaceing all map files already there with the updated ones.

## Page/Code Modification
now to make the code modifications.
1. first create a copy of the page template and place it in the /pages folder, and rename it after the new art work
2. next go through the page and replace the following (they should be labled in the template with a #)
   - Name of the artwork (Around line 22)
   - Name of artist (around line 24)
   - Year of creation (around line 25)
   - Materials (around line 26)
   - refference the image of the artwork (around line 32)
   - alt text for the image of the artwork (around line 32)
   - path for the text for the artwork (around line 37)
   - path for the map of the artwork (around line 40)
   - path to the audio recording of the artwork (around line 44)
3. next some modifications will need to be made to the scripts file these involve the following
   - first of all at the top of the scripts file (around line 5) there is a list of all the pages for the tour. the new page will need to be added to this list. to do this add a ',' to the end of the last line and then on the next line put the name of the .html page in between two' " '. (don't include the .html that is in the name)
   - next a change needs to be made to load the audiofile onto the page. down at around line 100, there is a bunch of if else statements. after the last 'else if' but before the start of the next 'else' (BE MORE CLEAR HERE) add the following:

   ```
   else if (currPath.includes("#PAGE NAME OF NEW ART WORK"))
   {
      audioPlayer.src = "/resources/audio/#AUDIO RECORDING OF NEW ART WORK.mp3";
   }
   ```
   but note to replace the two # objects with the appropriate refferences

## Other notes
- Bla
- Bla
- Bla

