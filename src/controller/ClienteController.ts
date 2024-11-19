import { Request, Response } from "express";
import { Cliente } from "../model/Cliente";

interface ClienteDTO {
    idCliente: string,
    nome: string,
    cpf: string,
    telefone: string
}

export class ClienteController extends Cliente{
    /**
     * lista todos clientes.
     * @param req objeto de requisição HTTP.
     * @param res Objeto de resposta HTTP.
     * @returns lista de clientes em formato JSON
     * @throws Retorna um status 400 com uma mensagem de erro caso ocorra uma falha ao acessar a listagem de clientes.
     */
    static async todos(req: Request, res: Response): Promise<Response> {
        try{
            //acessa a função de listar os clientes e armazena o resultado
            const listaDeCliente = await Cliente.listagemCliente();
            
            // retorna a lista de clientes há quem fez a requisição web
            return res.status(200).json(listaDeCliente);
         } catch(error) {
            //lança uma mensagem de erro no console
            console.log('Erro ao acessar listagem de clientes');

            //Retorna uma mensagem de erro há quem chamou a mensagem 
            return res.status(400).json({mensagem:"Não foi possivel acessar a listagem de clientes"});
         }
    }

    /**
     * @param {Request} req - Objeto de requisição HTTP, contendo os dados de cada um cliente no formato `ClienteTDO`.
     * @param {Response} res - Objeto de resposta HTTP usado para retornar o status e a mensagem ao cliente.
     * @returns {Promise<Response>} - Retorna uma resposta HTTP com status 200 em caso de sucesso, ou 400 em caso de erro.
     * 
     * @throws {Erro} - Se ocorrer um erro durante o processo de cadastro, uma mensagem é exibida no console e uma 
     *                  resposta HTTP 400 com uma mensagem de erro é enviada ao cliente.
     */
    static async novo(req: Request, res: Response): Promise<Response>{
        try{
            // recuperando informações do corpo da requisição e colocando em um objeto da interface ClienteDTO
            const clienteRecebido: ClienteDTO = req.body;

            // iniciando um objeto do tipo cliente com as informações recebidas
            const novoCliente = new Cliente(clienteRecebido.nome,
                                            clienteRecebido.cpf,
                                            clienteRecebido.telefone);
            // chama a função de cadastro passando o objeto como paramentro
            const respostaClasse = await Cliente.cadastroCliente(novoCliente);
            
            // verifica a resposta da função
            if(respostaClasse) {
                // retornar uma mensagem de sucesso
                return res.status(200).json({mensagem:"Cliente cadastrado com sucesso!"});
            } else {
                //retorna uma mensagem de erro
                return res.status(400).json({mensagem:"Erro ao cadastrar cliente. Entre em contato com o administrador do sistema."})
            }
        } catch(erro) {
            //lança uma mensagem de erro no console
            console.log(`Erro ao cadastrar o cliente. ${erro}`);

            // retorna uma mensagem de erro há quem chamou a mensagem
            return res.status(400).json({mensagem:"Não foi possivel cadastrar o cliente. Entre em contato"})
        }
    }

    static async remover(req: Request, res: Response): Promise<Response> {
        try{
            const idCliente = parseInt(req.params.idCliente as string);

            const repostaModelo =  await Cliente.removerCliente(idCliente);

            if(repostaModelo){
                return res.status(200).json({mensagem: "O cliente foi removido com sucesso!"});

            } else{
                return res.status(400).json({mensagem:" Erro ao remover o cliente. entre em contato com o administrador do sistema."})
            }

        }catch (error) {
            // lança uma mensagem de erro no console
            console.log(`Erro ao remover um cliente. ${error}`);

            // retorna uma mensagem de erro há quem chamou a mensagem
            return res.status(400).json({ mensagem: "Não foi possível remover o cliente. Entre em contato com o administrador do sistema." });
        }

    } 

    static async atualizar(req: Request, res: Response): Promise<Response>{
        try{
            const clienteRecebido: ClienteDTO = req.body;
            
            const idClienteRecebido = parseInt(req.params.idCliente as string)

            const clienteAtualizado = new Cliente(
                clienteRecebido.nome,
                clienteRecebido.cpf,
                clienteRecebido.telefone
            );

            clienteAtualizado.setIdCliente(idClienteRecebido);

            const respostaModelo = await Cliente.atualizarCliente(clienteAtualizado);

            if (respostaModelo) {

                return res.status(200).json({mensagem: "Cliente foi atualizado com sucesso!"});
            } else{

                return res.status(400).json({mensagem: "Não foi possivel atualizar o cliente. Entre em contato com o administrador."})
            }
        } catch (error) {
            console.log(`Erro ao atualizar um cliente.${error}`);

            return res.status(400).json({mensagem: "Não foi possivel atualizar o cliente. entre em contato com o administrador."})
        }
    }
}

