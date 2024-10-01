/**
 * Classe que representa um carro.
 */
export class Pedido {

    /* Atributos */
    /* Identificador do carro */
    /* marca do carro */
    private idCliente: number = 0;

    private idCarro: number = 0
    /* modelo do carro */
    private dataPedido: Date;
    /* ano de fabrição do carro */
    private valorPedido: number = 0;

    /**
     * Construtor da classe Carro
     * 
     * @param idCliente
     * @param idCarro
     * @param dataPedido
     * @param valorPedido
     */
    constructor(
        idCliente: number,
        idCarro: number,
        dataPedido: Date,
        valorPedido: number,
    ) {
        this.idCliente = idCliente;
        this.idCarro = idCarro;
        this.dataPedido = dataPedido;
        this.valorPedido = valorPedido;
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
     * 
     * @param idCliente 
     */
    public setIdCliente(idCliente: number): void {
        this.idCliente = idCliente;
    }

    /**
     * 
     * @returns {number} 
     */
    public getIdCarro(): number {
        return this.idCarro;
    }
    /**
     * 
     * 
     * @param idCarro 
     */

    public setIdCarro(idCarro: number): void {
        this.idCarro = idCarro;
    }
      /**
     * 
     *
     * @returns {number} 
     */

      public getDataPedido(): Date {
        return this.dataPedido;
    }
      /**
     * 
     * 
     * @param dataPedido
     */

      public setDataPedido(dataPedido: Date): void {
        this.dataPedido = dataPedido;
    }
    /**
     * 
     *
     * @returns {Date} 
     */

    public getValorPedido(): number {
        return this.valorPedido;
    }

    /**
     * 
     *
     * @param valorPedido
     */
    public setValorPedido(valorPedido: number): void {
        this.valorPedido = valorPedido;
    }
    /**
     * 
     *
     * @returns {number} 
     */
    
}