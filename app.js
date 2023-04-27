const express=require("express");

const bodyParser = require('body-parser');
const fs=require('fs');


const session=require("express-session");

const path=require('path');

const ejs=require('ejs');

const passport = require('passport');

const FacebookStrategy = require( 'passport-facebook').Strategy;

const model=require('./models');
const image=model.Image;
const multer=require("multer");
const { google } = require('googleapis');
const nodemailer=require("nodemailer");
const { response } = require("express");

const { OAuth2 } = google.auth;

require('dotenv').config();
const User=model.User;
const Calender=model.Calendar;
const app=express();
app.set("view engine", "ejs");
const port=process.env.port ||3000;
app.use(bodyParser.json({ limit: '50mb' }));

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.json());

const static_path=path.join(__dirname,"../","public");
app.use(express.static(static_path));

// app.use(session({
//     resave: false,
//     saveUninitialized: true,
//     secret: 'cvfcgv' 
//   }));

//   app.use(passport.initialize());
//   app.use(passport.session());
  


//   passport.serializeUser(function (user, done) {
//     done(null, user);
//   });
  
//   passport.deserializeUser(function (obj, done) {
//     done(null, obj);
//   });

// passport.use(new FacebookStrategy({
//     clientID: '247322754498684',
//     clientSecret: '7176ead9d57005f67272e0d4f3bfd18f',
//     callbackURL: "http://localhost:3000/auth/facebook/callback",
//     profileFields: ['id', 'displayName']
//   },
 
//   async function(accessToken, refreshToken, profile, cb) {
//     console.log("profile....",profile.id)
//   const us=await User.findOne({where:{facebook_id:profile.id}});
//  console.log('ggggg',us)
//   if(!us){
//     console.log("profile id...",profile.id);
//     const dat=await User.create({
//         facebook_id:profile.id,
//         name:profile.displayName,
        
      
//     });
//     console.log("data",dat);
//   }
//   else{
//     console.log("user already exist in the databse")
//     console.log("data1");
//   }
//     console.log(accessToken);
//     console.log(profile);

//      return cb(null, profile);


    

 

//   }
// ));


// app.get('/login',(req,res)=>{
//     res.render('fbauth');
// })

// app.get('/auth/facebook',
//   passport.authenticate('facebook'));



//   app.get('/auth/facebook/callback',
//     passport.authenticate('facebook', { failureRedirect: '/login' }),
//       function(req, res) {
//           try {
//           console.log(req.user);
//           res.send("login sucessfully");
//         } catch (error) {
//            console.error(error);
         
//         }
//     }
//   );

// const transpoter=nodemailer.createTransport({
//   service:'gmail',

//     auth:{
//         user:process.env.User_email,
//         pass:process.env.User_password
//     },
//     tls: {
//       rejectUnauthorized: false
//     }

// });
  
  // const  OAuthclient = new google.auth.OAuth2(
  //   CLIENT_ID = "655250845850-v993g5qvi4jv0heo2f4eo2htmhdmb0h4.apps.googleusercontent.com",
  //   CLIENT_SECRET ="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",
  //   REDIRECT_URL = "http://localhost:3000/auth"
  // );
  // const scope = ['https://www.googleapis.com/auth/calendar'];
  
  // app.get("/", (req, res) => {
  //   const authUrl =  OAuthclient.generateAuthUrl({
  //     access_type: "offline",
  //     scope: scope,
  //   });
  
  //   res.redirect(authUrl);
  // });

// console.log("dbahbjkahncf");
//   const calendars = google.calendar({ 
//     version: 'v3',
//     auth:"AIzaSyD1tPWvwIB16sb8ILcT29YmVDY4fxNJfHM"
//   });

//   app.get("/auth", async (req, res) => {
  
//     const token = req.query;
//     console.log("token is",token)
//     const {tokens} = await  OAuthclient.getToken(token);
//     OAuthclient.setCredentials(tokens);
//     res.redirect('/event');
    
//   });
  
  
//   app.get('/event',(req,res)=>{
//     res.render('index');
//   })

//   app.post('/event', async (req, res) => {
//     try {
//       const { summary, location, description, start, end, email,colorId } = req.body;
  
//       const event = {
//         summary,
//         location,
//         description,
//         start: {
//           dateTime: new Date(start).toISOString(),
//           timeZone: 'Asia/Kolkata'
//         },
//         end: {
//           dateTime: new Date(end).toISOString(),
//           timeZone: 'Asia/Kolkata'
//         },
//         reminders: {
//           useDefault: true
//         },
//         colorId
//       };
  
//       const startTime = new Date(start).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
//       const endTime = new Date(end).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
  
//       const response = await calendars.events.insert({
//         calendarId: 'primary',
//         auth: OAuthclient,
//         resource: event
//       });
  
//       const eventId = response.data.id;
//       await Calender.create({
//         event_id:eventId
//       });
  
//       transpoter.sendMail({
//         from: 's12348946@gmail.com', // Your email address
//         to: email, // Recipient email address
//         subject: 'Event Details', // Email subject
//         html: `Event Summary: ${event.summary}<br>
//                Event Location: ${event.location}<br>
//                Event Description: ${event.description}<br>
//                Event Start Time: ${startTime}<br>
//                Event End Time: ${endTime}<br>
//                Event ID: ${eventId}`, // Email body with event details
//       }, (err, info) => {
//         if (err) {
//           console.error(err);
//         } else {
//           console.log(`Email sent: ${info.messageId}`);
//         }
//       });
  
//       res.render('calen');
//     } catch (error) {
//       console.log(error);
//       res.status(500).send('Failed to create event');
//     }
//   });

//   app.get('/delev',async(req,res)=>{
//     res.render('del');
//   })

//   app.post('/delev', async (req, res) => {
//     try {
//       console.log("hfbcvflkdjvglokorf");
//       const eventId = req.body.eventId;
//       console.log("event id",eventId);
  
//       const response = await calendars.events.delete({
//         calendarId: 'primary',
//         auth:OAuthclient,
//         eventId: eventId
//       });
  
//       console.log('Event deleted:', response);
//       await Calender.destroy({
//         where: {
//           event_id: eventId
//         }
//       });
  
//       res.send('Event deleted');
      
    
  
//     } catch (error) {
//       console.log(error);
//       res.status(500).json('Failed to delete event');
//     }
//   });
 
//  app.get('/update-event',(req,res)=>{
//   res.render('updateevent');
//  })

//  app.post('/update-event', async (req, res) => {
//   try {
//     const { eventId, summary, location, description, start, end } = req.body;

//     const event = await calendars.events.get({
//       calendarId: 'primary',
//       auth: OAuthclient,
//       eventId: eventId
//     });

//     event.data.summary = summary;
//     event.data.location = location;
//     event.data.description = description;
//     event.data.start.dateTime = new Date(start).toISOString();
//     event.data.end.dateTime = new Date(end).toISOString();

//     const updatedEvent = await calendars.events.update({
//       calendarId: 'primary',
//       auth: OAuthclient,
//       eventId: eventId,
//       resource: event.data
//     });

//     console.log('Event updated:', updatedEvent);

//     res.send('Event updated');
//   } catch (error) {
//     console.log(error);
//     res.status(500).json('Failed to update event');
//   }
// });

//...........................................google drive

const multerstorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"public");
    },
    filename:(req,file,cb)=>{
        const ext=file.mimetype.split("/")[1];
        cb(null,`${file.fieldname}-${Date.now()}.${ext}`);
    },
});
const upload=multer({
    storage:multerstorage
});




const  OAuthclient = new google.auth.OAuth2(
  CLIENT_ID = "427869273381-memrq7h2ct5unud3ptpdf13rfpe6653a.apps.googleusercontent.com",
  CLIENT_SECRET ="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",
  REDIRECT_URL = "http://localhost:3000/google/callback"
);
const scope = ['https://www.googleapis.com/auth/drive.file'];


const drive = google.drive({
  version: 'v3',
  auth: OAuthclient
});

 app.get("/", (req, res) => {
    const authUrl =  OAuthclient.generateAuthUrl({
      access_type: "offline",
      scope: scope,
    });
  
    res.redirect(authUrl);
  });

 

  app.get("/google/callback", async (req, res) => {
  
    const token = req.query.code;
    console.log("token is",token)
    const {tokens} = await  OAuthclient.getToken(token);
    OAuthclient.setCredentials(tokens);
   res.redirect('/upload');
    
  });

app.get('/upload',(req,res)=>{
  res.render('upload')
})

app.post('/upload',upload.single('image'), async(req,res)=>{
  try {
    console.log("file path"  ,req.file.path);
  


    const filemetadata={
      name:req.file.filename,
      
    }
    console.log("filemetadata",filemetadata);
    const media={
      MimeType:req.file.mimetype,
      body:fs.createReadStream(req.file.path)
    }
  
   const dat=await drive.files.create({
      resource:filemetadata,
      media:media,
      fields:"id"
       // fs.unlinkSync(req.file.path);
    })

   const id = dat.data.id

 const data=await image.create({
         image_id:id
 })
 console.log("dataaaaa",data);

    console.log("data",id);
      // res.send("file upload");
      res.render("getimage");
    
    
    
  } catch (error) {
    console.log(error);
  }
  
})


app.get("/generateurl",(req,res)=>{
  res.render("getimage");

})


app.post('/generateurl',async(req,res)=>{
  try {
    const fieldid=req.body.image_id;
    await drive.files.create({
      fileId:fieldid,
      requestBody:{
        role:'reader',
        type:'anyone'
      }
    });

    const result=await drive.files.get({
      fileId:fieldid,
      fields:'webViewLink , webContentLink'
    });
    console.log(result.data)
    res.send(`<a href="${result.data.webContentLink}">click here to download image</a> <br><a href="${result.data.webViewLink}">click here to open image</a>`);
  } catch (error) {
    console.log(error);
  }
})

app.get('/deleteimage',(req,res)=>{
  res.render('delete');
})

app.post('/deleteimage', async (req, res) => {
  try {
    const fileId = req.body.image_id;

    // Delete file from Google Drive
    await drive.files.delete({
      fileId: fileId,
    });

    // Delete file from database
          await image.destroy({
        where: {
          image_id:fileId
        }
      });
    // await Image.findOneAndDelete({ file_id: fileId });

    res.send("File deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error deleting file");
  }
});
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });