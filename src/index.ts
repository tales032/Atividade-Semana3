
import fs from 'fs';
import readline from 'readline';

interface MenudeItens{
    identificador: string;
    peso: number;
    valor :number;
    quantidade: number;

}

const inventario = 'inventario.csv';

class Gerenciador {
    private itens: MenudeItens[] = []

    constructor() {
        this.loadFromFile();
      }

      private loadFromFile():void{
        if(fs.existsSync(inventario)){
            const data = fs.readFileSync(inventario, 'utf-8');
            this.itens = data
            .split('\n')
            .filter(function(linhavazia){
                return linhavazia.trim() !== ''; 
            })

            .map(function(linhavazia){

                const [identificador, peso, valor, quantidade] = linhavazia.split(',');
                return {
                    identificador, 
                    peso: parseFloat(peso), 
                    valor: parseFloat(valor), 
                    quantidade: parseInt(quantidade, 10) 
                };

            })



        }

      }

        private salvarArquivo(): void{
            const data = this.itens
            .map(function(item){
                return `${item.identificador},${item.peso}, ${item.valor}, ${item.quantidade}`
            })

            .join('\n');
            fs.writeFileSync(inventario, data);
        }
            adicionarItem(item:MenudeItens):void{

                this.itens.push(item);
                this.salvarArquivo();
            }

            removerItem(nomeDoItem: string): void{
                this.itens = this.itens.filter(function(item){
                    return item.identificador !== nomeDoItem;
                    
                })

                this.salvarArquivo();
            }

            ListarItens():void{
                console.log("Inventário: ")
                this.itens.forEach(function(item){
                    console.log(`Nome: ${item.identificador}, Peso: ${item.peso}, Valor: ${item.valor}, Quantidade:${item.quantidade}`);
                });
            }

            QuantidadeTotaldeItens():void{
                const QuantidadeTotal = this.itens.reduce(function(sum,item){
                    return sum + item.quantidade
                }, 0);
            

            
                    const PesoTotal = this.itens.reduce(function(sum,item){
                    return sum + item.peso * item.quantidade;
                    }, 0);

                
            
            
                    const Valortotal = this.itens.reduce(function(sum,item){
                        return sum + item.quantidade * item.valor
                    }, 0);
                

            
                    const MediaValores = Valortotal/QuantidadeTotal;

                        console.log(`Peso total: ${PesoTotal}`);
                        console.log(`Valor total: ${Valortotal}`);
                        console.log(`Media total: ${MediaValores}`);
                
                }
                
            
    }

    const leitura = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    const inventario1 = new Gerenciador();

    function MenuPrincipal(): void{
        console.log("\n Sistema de Inventário.");
        console.log("1. Adicionar Item");
        console.log("2. Remover Item");
        console.log("3. Listar itens");
        console.log("4. Calcular Total");
        console.log("5. Sair");

        leitura.question("Escolha uma opção: ", function(alternativa){
            switch(alternativa){
                case '1':
                    leitura.question("Escreva o nome, peso, valor e quantidade de itens.:", function(entrada){
                        const[identificador, peso, valor, quantidade] = entrada.split(',');
                        inventario1.adicionarItem({
                            identificador,
                            peso:parseFloat(peso),
                            valor:parseFloat(valor),
                            quantidade:parseInt(quantidade,10),

                        });

                        console.log("Item Adicionado.")
                        MenuPrincipal();
                    });

                    break;

                    case'2':
                    leitura.question("Digite  o nome do item a ser removido: ", function(nome){
                        inventario1.removerItem(nome);
                        console.log("O item foi removido");
                        MenuPrincipal();
                    });
                    break;

                    case'3':
                    inventario1.ListarItens();
                    MenuPrincipal();
                    break;

                    case'4':
                    inventario1.QuantidadeTotaldeItens();
                    MenuPrincipal();
                    break;

                    case'5':
                    leitura.close();
                    break; 

                    default: 
                    console.log("Opção Inválida");
                    MenuPrincipal();
                    break; 

            
            }
        })


    }
    MenuPrincipal();
 
 