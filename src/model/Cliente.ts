import { DatabaseModel } from "./DatabaseModel";

// armazenei o pool de conexões
const database = new DatabaseModel().pool;

/**
 * Classe que representa um carro.
 */

export class Cliente {
    
    /* Atributos */
    /* Identificador de cliente */
    private idCliente: number =0;
    /* nome do cliente*/
    private nome: string;
    /* cpf do ciente*/
    private cpf: string;
    /* contato do cliente*/
    private telefone: string;


     /**
     * Construtor da classe Cliente
     * 
     * @param nome nome do cliente
     * @param cpf cpf do cliente
     * @param telefone contato do cliente
     */
     constructor(
        nome: string,
        cpf: string,
        telefone: string
    ) {
        this.nome = nome;
        this.cpf = cpf;
        this.telefone = telefone;
    }

     /* Métodos get e set */
    /**
     * Recupera o identificador do carro
     * @returns o identificador do carro
     */
    public getIdCliente(): number {
        return this.idCliente;
    }

    /**
     * Atribui um valor ao identificador do carro
     * @param idCliente novo identificado do carro
     */
    public setIdCliente(idCliente: number): void {
        this.idCliente = idCliente;
    }
      /**
     * Retorna a marca do carro.
     *
     * @returns {string} A marca do carro.
     */
      public getNome(): string {
        return this.nome;
    }

    /**
     * Define a marca do carro.
     * 
     * @param nome - A marca do carro a ser definida.
     */
    public setNome(nome: string): void {
        this.nome = nome;
    }

    /**
     * Retorna o modelo do carro.
     *
     * @returns {string} O modelo do carro.
     */
    public getCpf(): string {
        return this.cpf;
    }

    /**
     * Define o modelo do carro.
     *
     * @param cpf - O nome do modelo do carro.
     */
    public setCpf(cpf: string): void {
        this.cpf = cpf;
    }

    /**
     * Retorna o ano do carro.
     *
     * @returns O ano do carro.
     */
    public getTelefone(): string {
        return this.telefone;
    }

    /**
     * Define o ano do carro.
     * 
     * @param telefone - O ano a ser definido para o carro.
     */
    public setTelefone(telefone: string): void {
        this.telefone = telefone;
    }

    /* Realiza o cadastro de um cliente no banco de dados.
     * 
     * Esta função recebe um objeto do tipo Cliente e insere seus dados (nome, cpf, telefonee)
     * na tabela cliente do banco de dados. O método retorna um valor booleano indicando se o cadastro 
     * foi realizado com sucesso.
     * 
     * @param {Cliente} cliente - Objeto contendo os dados do cliente que será cadastrado. O objeto Cliente
     *                        deve conter os métodos getNome(), getCpf(), getTelefone() 
     *                        que retornam os respectivos valores do cliente.
     * @returns {Promise<boolean>} - Retorna true se o cliente foi cadastrado com sucesso e false caso contrário.
     *                               Em caso de erro durante o processo, a função trata o erro e retorna false.
     * 
     * @throws {Error} - Se ocorrer algum erro durante a execução do cadastro, uma mensagem de erro é exibida
     *                   no console junto com os detalhes do erro.
     */

    static async listagemCliente(): Promise<Array <Cliente> | null> {
        const listaDeCliente: Array<Cliente> = [];

        try {
            // query de consulta e banco de dados 
            const querySelectCliente = `SELECT * FROM Cliente;`

            // fazendo a consulta e guardando resposta 
            const respostaBD = await database.query(querySelectCliente);

            //usando a resposta ´para instanciar uma pessoa do tipo Cliente
            respostaBD.rows.forEach((linha) =>{
                // instancia (cria) pessoa Cliente
                const novoCliente = new Cliente(
                    linha.nome,
                    linha.cpf,
                    linha.telefone
                 );

                
                // atribui o ID objeto
                novoCliente.setIdCliente(linha.id_cliente);

                // adiciona o objeto na lista
                listaDeCliente.push(novoCliente);

            });

        return listaDeCliente

       }catch (error) {
            console.log('Erro ao buscar lista de carros');
            return null;
       }
    }

    // fazer o cadastro do cliente
    static async cadastroCliente(cliente: Cliente): Promise<boolean> {
        try {
            // query para fazer insert de um carro no banco de dados
            const queryInsertCliente = `INSERT INTO cliente (nome, cpf, telefone)
                                        VALUES
                                        ('${cliente.getNome()}', 
                                        '${cliente.getCpf()}', 
                                        '${cliente.getTelefone()}') 
                                        RETURNING id_cliente;`;

            // executa a query no banco e armazena a resposta
            const respostaBD = await database.query(queryInsertCliente);

            // verifica se a quantidade de linhas modificadas é diferente de 0
            if (respostaBD.rowCount != 0) {
                console.log(`Cliente cadastrado com sucesso! ID do cliente: ${respostaBD.rows[0].id_cliente}`);
                // true significa que o cadastro foi feito
                return true;
            }
            // false significa que o cadastro NÃO foi feito.
            return false;

            // tratando o erro
        } catch (error) {
            // imprime outra mensagem junto com o erro
            console.log('Erro ao cadastrar o cliente. Verifique os logs para mais detalhes.');
            // imprime o erro no console
            console.log(error);
            // retorno um valor falso
            return false;
        }
    }

    static async removerCliente(idCliente: number): Promise<boolean>{
        try{
            const queryDeleteCliente = `DELETE FROM cliente WHERE id_cliente = ${idCliente};`;

            const respostaBD = await database.query(queryDeleteCliente);

            //verifica se o numero de linhas alteradas é diferente de 0
            if(respostaBD.rowCount != 0){
                // exibe uma mensagem no console 
                console.log(`Cliente removido com sucesso. ID removido: ${idCliente}`);
                // retorna true, indicando que o carro foi removido 
                return true;
            }

            return false;
        } catch (error) {
            console.log(`Erro ao remover cliente. Verifique os logs para mais detalhes.`);
            console.log(error);
            return false;
        }
    }

} 
