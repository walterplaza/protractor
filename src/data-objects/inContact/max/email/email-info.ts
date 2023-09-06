import { SkillCore, SkillType } from "@data-objects/general/skill-core";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";

export enum ErrorMessageContent {
    DISCARD_ERROR = "Would you like to discard this draft?",
    PROCEED_ERROR = "This will permanently delete this contact"
}

export enum ConfirmButtonTitle {
    DISCARD = "Discard",
    PROCEED = "Proceed",
    GOT_IT = "GotIt"
}

export enum DateTimeSortType {
    DESCENDING = "Date & Time Descending",
    ASCENDING = "Date & Time Ascending"
}

export enum EmailButtonTitle {
    DISCARD = "discard",
    FORWARD = "forward",
    SEND = "send",
    REPLY_ALL = "reply-all",
    REPLY = "reply",
    PARK_EMAIL = "park-email"
}

export enum EmailMode {
    READ = "read",
    EDIT = "edit"
}

export enum EmailFont {
    ARIAL = "Arial",
    COURIER_NEW = "Courier New",
    GEORGIA = "Georgia",
    TIMES_NEW_ROMAN = "Times New Roman",
    VERDANA = "Verdana"
}

export enum EmailParkMode {
    PARK_EMAIL = "park-email",
    UNPARK_WORK_NOW = "unpark-email-now",
    UNPARK_MOVE_TO_QUEUE = "unpark-email"
}

export enum EmailFontSize {
    PT_8 = "8pt",
    PT_10 = "10pt",
    PT_12 = "12pt",
    PT_14 = "14pt",
    PT_16 = "16pt",
    PT_18 = "18pt"
}

export enum EmailTinyToolButton {
    BOLD = "Bold",
    ITALIC = "Italic",
    UNDERLINE = "Underline",
    STRIKETHROUGH = "Strikethrough",
    FONTFAMILY = "Font Family",
    FONTSIZES = "Font Sizes",
    TEXTCOLOR = "Text color",
    BACKGROUNDCOLOR = "Background color",
    BULLETLIST = "Bullet list",
    NUMBERLIST = "Numbered list",
    DECREASEINDENT = "Decrease indent",
    INCRESEINDENT = "Increase indent",
    INSERT = "Insert/edit link",
    UNDO = "Undo"
}

export enum EmailColor {
    RED = "Red",
    AMBER = "Amber",
    YELLOW_GREEN = "Yellow green",
    SEA_GREEN = "Sea green",
    MEDIUM_GRAY = "Medium gray",
    PURPLE = "Purple",
    ROYAL_BLUE = "Royal blue",
    TURQUOISE = "Turquoise",
    WHITE = "White",
    RED_VIOLET = "Red violet",
    SKY_BLUE = "Sky blue",
    AQUA = "Aqua",
    LIME = "Lime",
    YELLOW = "Yellow",
    GOLD = "Gold",
    MAGENTA = "Magenta",
    NO_COLOR = "No color",
    PLUM = "Plum",
    LIGHT_SKY_BLUE = "Light sky blue",
    PALE_CYAN = "Pale cyan",
    PALE_GREEN = "Pale green",
    LIGHT_YELLOW = "Light yellow",
    PEACH = "Peach",
    PINK = "Pink",
    VERY_DARK_GRAY = "Very dark gray",
    INDIGO = "Indigo",
    NAVY_BLUE = "Navy Blue",
    DARK_AZURE = "Dark azure",
    DARK_GREEN = "Dark green",
    DARK_OLIVE = "Dark olive",
    BURNT_ORANGE = "Burnt orange",
    BLACK = "Black",
    GRAY = "Gray",
    GRAYISH_BLUE = "Grayish blue",
    BLUE = "Blue",
    TEAL = "Teal",
    GREEN = "Green",
    OLIVE = "Olive",
    ORANGE = "Orange",
    MAROON = "Maroon"


}

export class Email {
    emailAddress: string;
    dateTimeSortType: DateTimeSortType;
    toAddress: string;
    emailSubject: string;
    emailBody: string;
    attachmentFileName: string;
    launchMenuNotice: string;
    confirmButtonTitle: ConfirmButtonTitle;
    errorMessageContent: string;

    public initData(toAddress: string, emailSubject: string, attachmentFileName: string): Email {
        try {
            this.emailAddress = SkillCore.getSkillName(SkillType.OB_EMAIL);
            this.dateTimeSortType = DateTimeSortType.DESCENDING;
            this.toAddress = toAddress;
            this.emailSubject = emailSubject;
            this.attachmentFileName = attachmentFileName;
            this.launchMenuNotice = "No Results Found";
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.initData, err.message);
        }
    }

    public initFullData(toAddress: string, emailSubject: string, emailBody: string, attachmentFileName: string): Email {
        try {
            this.emailAddress = SkillCore.getSkillName(SkillType.OB_EMAIL);
            this.dateTimeSortType = DateTimeSortType.DESCENDING;
            this.toAddress = toAddress;
            this.emailSubject = emailSubject;
            this.emailBody = emailBody;
            this.attachmentFileName = attachmentFileName;
            this.launchMenuNotice = "No Results Found";
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.initData, err.message);
        }
    }
}
