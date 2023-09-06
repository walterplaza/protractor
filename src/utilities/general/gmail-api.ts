import ProjectPath from '@test-data/general/project-path';
import * as fs from 'fs';
import { google } from 'googleapis';
import { Base64 } from 'js-base64';
import readline from 'readline';

const SCOPES = ['https://mail.google.com/'];
const TOKEN_PATH = `${ProjectPath.project}/token.json`;

let sendTo: string = '';
let subject: string = '';
let body: string = '';
let from: string = 'testautomationincontact@gmail.com';

export class GmailController {

    /**
     * Create email template
     * @author Nhat Nguyen
     * @param {string} from
     * @param {string} to
     * @param {string} subject
     * @param {string} body
     * @returns {string}
     * @memberof GmailController
     */
	private email(from: string, to: string, subject: string, body: string): string {
		let mail = '';
		mail += `From: ${from} \n`
		mail += `To: ${to} \n`
		mail += `Subject: ${subject} \n`
		mail += "Date: Fri, 21 Nov 1997 09:55:06 -0600 \n"
		mail += "Message-ID: <1234@local.machine.example> \n"
		mail += "Content-Type: text/html; charset='UTF-8' \n"
		mail += "Content-Transfer-Encoding: base64 \n"
		mail += body
		return mail;
	}

    /**
     * Create an OAuth2 client with the given credentials, and then execute the
     * given callback function.
     * @author Nhat Nguyen
     * @param {Object} credentials The authorization client credentials.
     * @param {function} callback The callback to call with the authorized client.
     */
	private async authorize(credentials: any, callback: any): Promise<any> {
		const { client_secret, client_id, redirect_uris } = credentials.installed;
		const oAuth2Client = new google.auth.OAuth2(
			client_id, client_secret, redirect_uris[0]);

		// Check if we have previously stored a token.
		await fs.readFile(TOKEN_PATH, async (err: any, token: any) => {
			if (err) return await this.getNewToken(oAuth2Client, callback);
			await oAuth2Client.setCredentials(JSON.parse(token));
			await callback(oAuth2Client);
		});
	}

    /**
     * Get and store new token after prompting for user authorization, and then
     * execute the given callback with the authorized OAuth2 client.
     * @author Nhat Nguyen
     * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
     * @param {getEventsCallback} callback The callback for the authorized client.
     */
	private async getNewToken(oAuth2Client: any, callback: any): Promise<void> {
		const authUrl = await oAuth2Client.generateAuthUrl({
			access_type: 'offline',
			scope: SCOPES,
		});
		console.log('Authorize this app by visiting this url:', authUrl);
		const rl = await readline.createInterface({
			input: process.stdin,
			output: process.stdout,
		});
		await rl.question('Enter the code from that page here: ', async (code: any) => {
			await rl.close();
			await oAuth2Client.getToken(code, async (err: any, token: any) => {
				if (err) return console.error('Error retrieving access token', err);
				await oAuth2Client.setCredentials(token);
				// Store the token to disk for later program executions
				await fs.writeFile(TOKEN_PATH, JSON.stringify(token), async (err: any) => {
					if (err) return console.error(err);
					console.log('Token stored to', TOKEN_PATH);
				});
				await callback(oAuth2Client);
			});
		});
	}

    /**
     * Send Message.
     * @author Nhat Nguyen
     * @param  {String} userId User's email address. The special value 'me'
     * can be used to indicate the authenticated user.
     * @param  {String} email RFC 5322 formatted String.
     * @param  {Function} callback Function to call when the request is complete.
     */
	private async sendMessage(auth: any): Promise<void> {
		let gmailController = new GmailController();
		let base64EncodedEmail: string = Base64.encodeURI(gmailController.email(from, sendTo, subject, body));
		const gmail = google.gmail({ version: 'v1', auth });
		gmail.users.messages.send({
			userId: "me",
			resource: {
				raw: `${base64EncodedEmail}`,
			}
		}, (err: any, res: any) => {
			if (err != null) {
				console.log(err);
			}
		});
	}

    /**
     * Reset password
     * @author Nhat Nguyen
     * @param {Request} req
     * @param {Response} res
     * @returns {Promise<void>}
     * @memberof GmailController
     */
	public async sendEmailTo(toEmail: string, subjectMail: string, bodyMail: string): Promise<void> {
		let gmailController = new GmailController();

		await fs.readFile(`${ProjectPath.project}/credentials.json`, async (err: any, content: any) => {
			if (err) return console.log('Error loading client secret file:', err);
			sendTo = toEmail;
			subject = subjectMail;
			body = bodyMail;
			from = from;
			await this.authorize(JSON.parse(content), await gmailController.sendMessage);
		});

	}

	public async getEmailList() {
		let gmailController = new GmailController();

		await fs.readFile(`${ProjectPath.project}/credentials.json`, async (err: any, content: any) => {
			if (err) return console.log('Error loading client secret file:', err);
			await this.authorize(JSON.parse(content), await gmailController.listLabels);
		});
	}

	private async listLabels(auth: any): Promise<any> {

		var gmail = google.gmail({ auth: auth, version: 'v1' });

		var emails = gmail.users.messages.list({
			includeSpamTrash: false,
			maxResults: 500,
			q: "",
			userId: 'me'
		}, function (err, results) {
			console.log(results.data.messages);
		});
	}

	public async getMessage(messageId, auth): Promise<any> {
		var gmail = google.gmail({ auth: auth, version: 'v1' });

		gmail.users.messages.get({
			'userId': 'me',
			'id': messageId
		}, function (err, result) {
			console.log(result);
		});
	}
}

