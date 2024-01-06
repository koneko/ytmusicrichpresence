# youtube music rich presence
`npm i` to install dependencies  
make a `c.json` file in root directory with the following contents:  
```json
{
    "clientID": "your discord app client id",
    "expressPort": 3461
}
```
`node .` to start the server  
then open `yt.user.js` in tampermonkey and install it, then you're done!  
you can change the port in `c.json` and `yt.user.js` if you want to  
fin.