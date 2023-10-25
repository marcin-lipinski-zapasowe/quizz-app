export class UserValidator {
    UserLoginValidation = (data: any): any => {
        

        return {
            emailOrUsername: null,
            password: this.LoginPasswordValidation(data.password)
        }
    }

    UserRegisterValidation = (data: any): any => {        
        return {
            password: this.PasswordValidation(data.password),
            email: this.EmailValidation(data.email),
            passwordRepeat:this.PasswordRepeatValidation(data.password, data.passwordRepeat),
            username:this.UsernameValidation(data.username)
        }
    }

    UserChangePasswordValidation = (data: any): any => {
        return {
            newPasswordRepeat: this.PasswordRepeatValidation(data.newPassword, data.newPasswordRepeat),
            newPassword: this.PasswordValidation(data.newPassword)
        }
    }

    UserChangeUsernameValidation = (data: any): any => {
        return {
            newUsername: this.UsernameValidation(data.newUsername)
        }
    }

    private LoginPasswordValidation(data: string): any {
        if(!data.minLength(1)) return "The password must be at least 1 characters long.";
        return null;
    }

    private PasswordValidation(data: string): any {
        if(!data.minLength(10)) return "The password must be at least 10 characters long.";
        if(!data.contains("!@#$%()")) return"The password must contain at least 1 special character.";
        if(!data.hasNumbers(4)) return"The password must contain at least 4 numbers.";
        if(!data.hasUpperLetter(1)) return"The password must contain at least 1 upper letter.";
        return null;
    }

    private PasswordRepeatValidation(oldPassword: string, newPassword: string): any {
        if(newPassword !== oldPassword) return "Passwords are not the same.";
        return null;
    }

    private EmailValidation(data: string) {
        if(!data.isCorrectEmail()) return "The email is not correct.";
        return null;
    }

    private UsernameValidation(data: string) {
        return null;
    }
}