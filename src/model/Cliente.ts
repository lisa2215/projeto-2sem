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
     * @param idCliente identificação do cliente
     * @param nome nome do cliente
     * @param cpf cpf do cliente
     * @param telefone contato do cliente
     */
     constructor(
        idCliente: number,
        nome: string,
        cpf: string,
        telefone: string
    ) {
        this.idCliente = idCliente;
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

    
}
