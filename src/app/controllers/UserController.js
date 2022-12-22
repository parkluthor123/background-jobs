import Mail from "../lib/Mail";
import Queue from "../lib/Queue";

export default {
    async store(req, res) {
        const { name, email, password } = req.body;

        const user = {
            name,
            email,
            password

        }

        //Adicionar o job RegistrationMail a fila
        await Queue.add("RegistrationMail", { user }) 

        return res.json(user);
    }
}