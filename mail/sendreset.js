const nodemailer = require("nodemailer");
//send email
function SendResetPass(email, token, name) {
  var email = email;
  var token = token;
  var name = name;

 

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "supecoded@gmail.com", // Your email id
      pass: "uwrqbxpqbkgtwqos", // Your password
    },
  });
  let mailOptions = {
    from: { name: "Mi-Asset", address: "supecoded@gmail.com" }, // sender address
    to: email, // list of receivers
    subject: "Reset Password", // Subject line
    html: `<!doctype html>
  <html lang="en-US">
  
  <head>
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title>Reset Password Email Template</title>
      <meta name="description" content="Notification Email Template.">
      <style type="text/css">
          a:hover {text-decoration: underline !important;}
      </style>
  </head>
  
  <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
      <!--100% body table-->
      <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
          style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
          <tr>
              <td>
                  <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                      align="center" cellpadding="0" cellspacing="0">
                      <tr>
                          <td style="height:80px;">&nbsp;</td>
                      </tr>
                      <tr>
                          <td style="text-align:center;">
                            <a href="http://mi-asset.onrender.com" title="logo" target="_blank">
                              <img width="100" style="border-radius: 50%;" src="https://i.ibb.co/Bt29ccF/logo.jpg" title="logo" alt="logo">
                            </a>
                          </td>
                      </tr>
                      <tr>
                          <td style="height:20px;">&nbsp;</td>
                      </tr>
                      <tr>
                          <td>
                              <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                  style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                  <tr>
                                      <td style="height:40px;">&nbsp;</td>
                                  </tr>
                                  <tr>
                                      <td style="padding:0 35px;">
                                          <h1>Hi, ${name}</h1>
                                          <span
                                              style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                          <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                                We're sending you this email because you requested a password 
                                                reset for your Mi-Asset account.Resetting your password is easy.
                                                 Just press the button below and follow the instructions. We'll have you up and running in no time. 
                                               <br> 
                                               <a style="background-color:blue; border:20; color:white" href="http://localhost:4200/user/reset-password/${token}">Reset Password</a><br>
                                                or copy and paste the link below into your browser:
                                                <center>
                                                http://localhost:4200/user/reset-password/${token}
                                          </center>
                                          </p>
                                          <p><b>
                                            Thanks for bearing with Us
                                          </b></p>
                                          <p style=" text-align: right;"><b>
                                            SuperCoded
                               
                                            
                                          </b>
                                          </p>
                                          <p style=" text-align: right;">
                                          <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5Ojf/2wBDAQoKCg0MDRoPDxo3JR8lNzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzf/wAARCAAaAEADASIAAhEBAxEB/8QAGQABAAMBAQAAAAAAAAAAAAAAAAMEBQEH/8QAJxAAAgICAQMEAQUAAAAAAAAAAQIDEQAEEgUhMRMiQVFxFTNCYYH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A9xxjGBHsSGKFnA5MB7VuuRPYD/TWV2ig1NaSSVBK7CpGKgtKT2rv9k0B4+PGd6nIsWoZGZFCyRnk5oD3jyfrMvqnW0HTtbb1YJpdhpQI9f02tnpuS+KJUBzX2mBe0doxaijajeNULKJL5rxBIFt58AWSAP7zQVldQykMpFgg2CMwv1/Xi1Y16frz7oHERCIfuRBFYyAntXFhXwSVFjleXeiySS6okCRjXkeR42D2SC5K9gKqj9nA0cYxgMYxgUZtF5NmSX1InDjiFmiL8BVED3CgfntZ++wqDX0X0dmTZMb7crivUD0y9gKCsa/iLN2aF3V5q4wKPS9ZYFmK6i6ytKzRpS2AQLvjY7sCfP1+BY1NaHS1IdTVjEcEEaxxRr4VVFAD8AZNjAYxjA//2Q==" alt="signature">
                                          </p>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td style="height:40px;">&nbsp;</td>
                                  </tr>
                              </table>
                          </td>
                      <tr>
                          <td style="height:20px;">&nbsp;</td>
                      </tr>
                      <tr>
                          <td style="text-align:center;">
                              <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy; <strong>SuperCoded</strong></p>
                          </td>
                      </tr>
                      <tr>
                          <td style="height:80px;">&nbsp;</td>
                      </tr>
                  </table>
              </td>
          </tr>
      </table>
  </body>
  `,
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent to: " + email);
    }
  });
}
module.exports = SendResetPass;
