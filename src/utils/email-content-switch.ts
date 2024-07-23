import { SignUpDto } from "src/auth/dto/sign-up.dto"

export const signUpContent =(data: Partial<SignUpDto>, token: string, id: number)=>  {
    return {
        subject: 'Welcome Onboard',
        html: `
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome</title>
    <style>
        /* General reset for better email rendering */
        body, table, td, a {
            -webkit-text-size-adjust: 100%; /* Prevents iOS text resize after orientation change */
            -ms-text-size-adjust: 100%; /* Prevents Windows text resize after orientation change */
        }
        table, td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }
        img {
            -ms-interpolation-mode: bicubic;
        }
        body {
            margin: 0;
            padding: 0;
            width: 100% !important;
            height: 100% !important;
        }
        table {
            border-collapse: collapse !important;
        }
        /* Responsive */
        @media screen and (max-width: 600px) {
            .main-table {
                width: 100% !important;
            }
            .content {
                padding: 10px !important;
            }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td align="center" style="padding: 10px 0;">
                <table border="0" cellpadding="0" cellspacing="0" width="600" class="main-table" style="background-color: #ffffff; border-radius: 10px; overflow: hidden;">
                    <tr>
                        <td align="center" bgcolor="#0073e6" style="padding: 40px 20px; color: #ffffff; font-size: 24px; font-weight: bold;">
                            Welcome to Our Service!
                        </td>
                    </tr>
                    <tr>
                        <td align="left" style="padding: 40px 30px 20px 30px; color: #333333; font-size: 16px; line-height: 24px;">
                            <p style="margin: 0;">Hi ${data.firstName + ' ' + data.lastName},</p>
                            <p style="margin: 20px 0 0 0;">Thank you for signing up for our service. We are thrilled to have you on board.</p>
                            <p style="margin: 20px 0 0 0;">To get started, please confirm your email address by clicking the button below:</p>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="padding: 20px 30px;">
                            <a href="${process.env.BASE_URL}/auth/activate/${data.email}?id=${id}&token=${token}" style="background-color: #0073e6; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;  cursor: pointer">Confirm Email</a>
                        </td>
                    </tr>
                    <tr>
                        <td align="left" style="padding: 20px 30px 40px 30px; color: #333333; font-size: 16px; line-height: 24px;">
                            <p style="margin: 0;">If you have any questions, feel free to reply to this email or contact our support team at support@musty.com.</p>
                            <p style="margin: 20px 0 0 0;">Best regards,<br>The Team</p>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" bgcolor="#0073e6" style="padding: 20px 20px; color: #ffffff; font-size: 14px;">
                            &copy; 2024 Service Company. All rights reserved.
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>

        `
    }
}

export const resetPasswordContent =(email: string, token: string, id: number)=> {
    return {
        subject: 'Welcome Onboard',
        html: `
        <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Password Update Request</title>
                <style>
                    /* General reset for better email rendering */
                    body, table, td, a {
                        -webkit-text-size-adjust: 100%; /* Prevents iOS text resize after orientation change */
                        -ms-text-size-adjust: 100%; /* Prevents Windows text resize after orientation change */
                    }
                    table, td {
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                    }
                    img {
                        -ms-interpolation-mode: bicubic;
                    }
                    body {
                        margin: 0;
                        padding: 0;
                        width: 100% !important;
                        height: 100% !important;
                    }
                    table {
                        border-collapse: collapse !important;
                    }
                    /* Responsive */
                    @media screen and (max-width: 600px) {
                        .main-table {
                            width: 100% !important;
                        }
                        .content {
                            padding: 10px !important;
                        }
                    }
                </style>
            </head>
            <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                    <td align="center" style="padding: 10px 0;">
                        <table border="0" cellpadding="0" cellspacing="0" width="600" class="main-table" style="background-color: #ffffff; border-radius: 10px; overflow: hidden;">
                            <tr>
                                <td align="center" bgcolor="#0073e6" style="padding: 40px 20px; color: #ffffff; font-size: 24px; font-weight: bold;">
                                    Password Reset Request
                                </td>
                            </tr>
                            <tr>
                                <td align="left" style="padding: 40px 30px 20px 30px; color: #333333; font-size: 16px; line-height: 24px;">
                                    <p style="margin: 0;">Hi,</p>
                                    <p style="margin: 20px 0 0 0;">We received a request to reset your password. Click the button below to reset it:</p>
                                </td>
                            </tr>
                            <tr>
                                <td align="center" style="padding: 20px 30px;">
                                    <a href="https://frontend-page/auth/reset-password/${email}?id=${id}&validator=${token}" style="background-color: #0073e6; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; cursor: pointer;">Reset Password</a>
                                </td>
                            </tr>
                            <tr>
                                <td align="left" style="padding: 20px 30px 40px 30px; color: #333333; font-size: 16px; line-height: 24px;">
                                    <p style="margin: 0;">If you didn't request this, please ignore this email or let us know. This link is only valid for the next 24 hours.</p>
                                    <p style="margin: 20px 0 0 0;">If you have any questions, feel free to reply to this email or contact our support team at support@musty.com.</p>
                                    <p style="margin: 20px 0 0 0;">Best regards,<br>The Team</p>
                                </td>
                            </tr>
                            <tr>
                                <td align="center" bgcolor="#0073e6" style="padding: 20px 20px; color: #ffffff; font-size: 14px;">
                                    &copy; 2024 Service Company. All rights reserved.
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        
        </html>

        `
    }
}