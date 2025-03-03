import nodemailer from 'nodemailer';
import dotenv from 'dotenv';


dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export const sendPendingEmail = async (email: string) => {
    const htmlContent = `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
        <div style="max-width: 600px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #333; text-align: center;">Task Status: Pending</h2>
            <p style="color: #555; font-size: 16px; text-align: center;">
                Your task is currently in the <strong>pending state</strong>. We are processing it and will notify you once it's approved.
            </p>
            <p style="text-align: center;">
                <span style="background: #ffcc00; color: black; padding: 10px 15px; border-radius: 5px;">Pending</span>
            </p>
            <p style="text-align: center; margin-top: 20px;">
                <strong>Thank you for your patience!</strong>
            </p>
        </div>
    </div>
    `;

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Task is Pending',
            html: htmlContent
        });
        console.log(`Pending email sent to ${email}`);
    } catch (error) {
        console.error('Failed to send pending email:', error);
    }
};

export const sendApprovedEmail = async (email: string) => {
    const htmlContent = `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
        <div style="max-width: 600px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #333; text-align: center;">🎉 Task Approved!</h2>
            <p style="color: #555; font-size: 16px; text-align: center;">
                Congratulations! Your task has been <strong>approved successfully</strong>.
            </p>
            <p style="text-align: center;">
                <span style="background: #28a745; color: white; padding: 10px 15px; border-radius: 5px;">Approved</span>
            </p>
            <p style="text-align: center; margin-top: 20px;">
                <strong>Thank you for using our service!</strong>
            </p>
        </div>
    </div>
    `;

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Task Approved',
            html: htmlContent
        });
        console.log(`Approval email sent to ${email}`);
    } catch (error) {
        console.error('Failed to send approval email:', error);
    }
};
