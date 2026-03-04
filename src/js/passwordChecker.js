import { toast } from "react-hot-toast";

function checkPasswordStrength(password, confirmPassword, setErrorMessage) {
    let hasUppercase = false;
    let hasLowercase = false;
    let hasNumber = false;
    let hasSpecialCharacter = false;

    if (password !== confirmPassword) {
        toast.error('Password does not match with confirmed password')
        setErrorMessage("Password does not match with confirmed password");
        return false;
    }

    if (password.length < 8) {
        toast.error("Password must be at least 8 characters long.")
        setErrorMessage("Password must be at least 8 characters long.");
        return false;
    }

    for (let i = 0; i < password.length; i++) {
        if (password[i].match(/[A-Z]/)) {
            hasUppercase = true;
        } else if (password[i].match(/[a-z]/)) {
            hasLowercase = true;
        } else if (password[i].match(/\d/)) {
            hasNumber = true;
        } else if (password[i].match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/)) {
            hasSpecialCharacter = true;
        }
    }

    if (!hasUppercase) {
        toast.error("Password must contain at least one uppercase letter.")
        setErrorMessage("Password must contain at least one uppercase letter.");
    }
    else if (!hasLowercase) {
        toast.error("Password must contain at least one lowercase letter.")
        setErrorMessage("Password must contain at least one lowercase letter.");
    }
    else if (!hasNumber) {
        toast.error("Password must contain at least one number.")
        setErrorMessage("Password must contain at least one number.");
    }
    else if (!hasSpecialCharacter) {
        toast.error('Password must contain at least one special character')
        setErrorMessage(`Password must contain at least one special character, such as !@#$%^&*()_+-=[]{};':"\|,.<>/?`);
    }

    return hasUppercase && hasLowercase && hasNumber && hasSpecialCharacter;
}

export default checkPasswordStrength

// Length: A minimum length requirement, such as 8 characters.

// Uppercase letters: The presence of at least one uppercase letter.

// Lowercase letters: The presence of at least one lowercase letter.

// Numbers: The presence of at least one number.

// Special characters: The presence of at least one special character, such as !@#$%^&*()_+-=[]{};':"\|,.<>/?.
