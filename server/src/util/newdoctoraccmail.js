require('dotenv').config();

module.exports = function emailBody(PassWord){
    return  `
        <body style="background-color: rgb(255,255,255);">

            <div style="font-size: 15px;color: rgb(47,41,54);padding: 0;font-family:Helvetica Neue,Helvetica, sans-serif;
            width: 100%;font-weight: 400;margin: 0;background-color: rgb(255,255,255); background: #ffffff;">
                <div style="padding: 0;font-size: 0;display: none;max-height: 0;font-weight: 400;line-height: 0;"></div>
                <table style="border-radius: 4px;font-size: 15px;color: rgb(47,41,54);border-collapse: separate;border-spacing: 0;
                max-width: 700px;font-family: Helvetica Neue, helvetica, sans-serif;border: 1.0px solid rgb(199,208,212);padding: 0;
                width: 100%;font-weight: 400;margin: 15.0px auto;background-color: rgb(255,255,255);">
                    <tr style="font-weight: 400;">
                        <td style="padding: 0;font-weight: 400;margin: 0;text-align: center;">
                        <div style="padding: 25px 0 25px 0;font-size: 14px;font-weight: 400;border-bottom: 1.0px solid rgb(222,231,235);">
                            <div style="padding: 0 20px;max-width: 600px;font-weight: 400;margin: 0 auto;text-align: left;">
                                <table style="width: 100%;font-weight: 400;margin-bottom: 0;border-collapse: collapse;">
                                    <tr style="font-weight: 400;">
                                        <td width="125px" style="padding: 0;font-weight: 400;margin: 0;text-align: center;">
                                            <h1 style="font-size: 38px;color: rgb(0,0,0);letter-spacing: -1px;padding: 0;
                                                font-weight: normal;margin: 0;line-height: 42px;">
                                                <a href="${process.env.CLIENT_URL}" style="color: rgb(77, 112, 213);font-weight: 500;
                                                text-decoration: none;" target="_blank">
                                                <img src="https://res.cloudinary.com/doccomming/image/upload/v1717396983/yt992kbmg6qg9czjdwit.png" 
                                                height="50px" alt="DocComing" style="font-weight: 400;" /></a>
                                            </h1>
                                        </td>
                                        <td style="padding: 0;font-weight: 400;margin: 0;text-align: right;">
                                            <span style="font-weight: 600; font-size: 14px; position: relative; top: -2px;">
                                                Tài khoản bác sĩ DocComing
                                            </span>
                                            <br/>
                                            <span style="font-size: 14px; position: relative; top:2px;">Mật khẩu mới</span>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        </td>
                    </tr>
                    <tr style="font-weight: 400;">
                        <td style="padding: 0;font-weight: 400;margin: 0;text-align: center;">
                            <div style="padding: 0 20px;max-width: 600px;font-weight: 400;margin:0 auto;text-align: left;">
                                <div style="padding: 30.0px 0 20px;font-weight: 400;background-color: rgb(255,255,255);">

                                    Bạn đã là một thành viên trong đội ngũ bác sĩ uy tín của DocComing.<br><br>
                                    Vui lòng đăng nhập vào tài khoản của mình bằng mật khẩu này:<br><br>
                                    <h2 style="font-weight: bold">${PassWord}</h2>
                                    <br>
                                    Nếu bạn cần hỗ trợ, vui lòng liên hệ chúng tôi qua email 
                                    <a style="text-decoration: none;" href="mailto:doccoming@gmail.com?subject= Reset Password">
                                    doccoming@gmail.com</a><br><br>
                                </div>
                            </div>

                            <div style="max-width: 600px;padding: 0 20px; font-weight: 400;margin: 0 auto;text-align: left;">
                                <div style="padding: 20px 0 40px 0;border-top: 1px solid rgb(231,235,238);font-weight: 400;">

                                    <a href="${process.env.CLIENT_URL}/login" style="cursor: pointer; color: rgb(104,114,118);float: right;
                                    font-weight: 500;text-decoration: none;" target="_blank">
                                        Account Login
                                    </a>
                                    <a href="${process.env.CLIENT_URL}/help" style="cursor: pointer; color: rgb(104,114,118);font-weight: 500;
                                    text-decoration: none;" target="_blank">
                                        Help Center
                                    </a>

                                </div>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </body> 
    `
}