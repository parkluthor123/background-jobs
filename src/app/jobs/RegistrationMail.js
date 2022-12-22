import Mail from "../lib/Mail";

// Divide por chave e acao
export default {
    //Chave
    key: 'RegistrationMail',
    
    // Método a ser processado
    async handle({ data }){
        const { user } = data;

        await Mail.sendMail({
            from: `Queue Teste <queue@queuetest.com>`,
            to: `${user.name} <${user.email}>`,
            subject: "Cadastro de usuário",
            html: `<p>Olá, ${user.name}, bem vindo ao sistema de filas</p>`
        })
    }
}