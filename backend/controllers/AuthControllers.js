import User from '../models/UserModel';

export const CreateUser = async (req, res) => {
    const { username, email, password } = req.body

    if ( !username || !email || !password ) {
        return res.status(400).json({ error : 'All fields are required' })
    }

    try {
        const newUser = new User({ username, email, password })
        await newUser.save()
        res.status(201).json(newUser)
    } catch ( error ) {
        res.status(500).json({ error : 'Failed to create user' })
    }
}

export const GetUserByID = async (req, res) => {
    const { id } = req.body

    try {
        const User = await User.findById(id)
        if (!User) {
            res.status(404).json({ error : 'User ID not found' })
        }
        res.status(200).json(User)
    } catch (error) {
        res.status(500).json({ error : 'Failed to find user' })
    }
}