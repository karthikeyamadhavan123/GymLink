import { useCallback, useEffect, useState } from 'react'

const regexPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d\s]).{8,}$/

const useCheckPassword = (password: string) => {
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const checkPasswordStrength = useCallback(() => {
        if (password === '' || password === null) {
            setSuccess('');
            setError('');
            return;
        }

        // Clear success if password changes
        if (success) {
            setSuccess('');
        }

        if (password.match(regexPattern)) {
            setSuccess('All Password requirements completed!');
            setError(''); // Clear error on success
        } else {
            setError(
                'Password must be 8+ chars and include: uppercase, lowercase, number, and symbol.'
            );
        }
    }, [password])


    useEffect(() => {
        const timeout = setTimeout(() => {
            checkPasswordStrength()
        }, 500)

        return () => clearTimeout(timeout)
    }, [password])



    return { success, error }
}

export default useCheckPassword
