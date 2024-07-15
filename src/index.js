

const runnerSchema = {
    id: [1,2,3,4],
    Name: ["🔴Mario", "🟢Luigi","🟣Peach","🟡Yoshi"],
    Velocity: [4,3,2,4],
    Handling: [3,4,3,2],
    Power: [3,2,4,3],
    Points: [0,0,0,0]
}

class Runner { 
    constructor(id) { 
        //construtror da classe runner para instanciar novos corredores
        this.id = runnerSchema.id[id]
        this.Name = runnerSchema.Name[id]
        this.Velocity = runnerSchema.Velocity[id]
        this.Handling = runnerSchema.Handling[id]
        this.Power = runnerSchema.Power[id]
        this.Points = runnerSchema.Points[id]
      
        //remoção do corredor instanciado para evitar sorteios repetidos
        runnerSchema.id.splice(id,1)
        runnerSchema.Name.splice(id,1)
        runnerSchema.Velocity.splice(id,1)
        runnerSchema.Handling.splice(id,1)
        runnerSchema.Power.splice(id,1)
        runnerSchema.Points.splice(id,1)
    }
}
function drawRunnerId() { 
    let runnerId = Math.floor(Math.random() * runnerSchema.id.length);
    
    return runnerId
}

function RollDice() {
    return Math.floor(Math.random() * 6) + 1;
}


async function PlayEngine(runnerOne, runnerTwo){

    let totalTestSkill = 0;
    let totalTestSkill1 = 0;
    let attributedSkill = 0;
    let attributedSkill1 = 0;

    let diceNumber = 0
    let diceNumber1 = 0

    for (let i = 0; i <5; i++) {
        console.log(`================================= \n 🏁 rodada ${i+1} iniciando... 🏁 \n`)
        
            diceNumber = await RollDice()
            diceNumber1 = await RollDice()

            let CircuitType = await drawCircuit()

        console.log(`Tipo de circuito: ${CircuitType} \n`)

        if(CircuitType === "Handling 🚩"){
            totalTestSkill = diceNumber + runnerOne.Handling
            totalTestSkill1 = diceNumber1 + runnerTwo.Handling
            attributedSkill = runnerOne.Handling
            attributedSkill1 = runnerTwo.Handling
        }   
        if(CircuitType === "Reta ⏩💨") {
            totalTestSkill = diceNumber + runnerOne.Velocity
            totalTestSkill1 = diceNumber1 + runnerTwo.Velocity 
            attributedSkill = runnerOne.Velocity
            attributedSkill1 = runnerTwo.Velocity   
        }
        if(CircuitType === "Confronto 💥💢") {
            totalTestSkill = diceNumber + runnerOne.Power
            totalTestSkill1 = diceNumber1 + runnerTwo.Power
            attributedSkill = runnerOne.Power
            attributedSkill1 = runnerTwo.Power
        }
        console.log(` ${runnerOne.Name} rolou o número 🎲 ${diceNumber}, ${diceNumber} + ${attributedSkill} = ${totalTestSkill} \n`)
        
        console.log(` ${runnerTwo.Name} rolou o número 🎲 ${diceNumber1}, ${diceNumber1} + ${attributedSkill1} = ${totalTestSkill1} \n`)
     
        //Operadores ternários para distribuição dos pontos
        runnerOne.Points += 
            totalTestSkill > totalTestSkill1 &&
            CircuitType !== "Confronto 💥💢" ? 1 : 0
        
        runnerTwo.Points += 
            totalTestSkill1 > totalTestSkill && 
            CircuitType !== "Confronto 💥💢" ? 1 : 0

        runnerOne.Points -= 
            totalTestSkill1 > totalTestSkill && 
            CircuitType === "Confronto 💥💢" &&
            runnerOne.Points > 0 ? 1 : 0

        runnerTwo.Points -=
            totalTestSkill > totalTestSkill1 &&
            CircuitType === "Confronto 💥💢" &&
            runnerTwo.Points > 0 ? 1 : 0

        console.log(`${totalTestSkill === totalTestSkill1 ? "Empate, não houve vencedores \n" :
        `\n O vencedor da rodada é ${totalTestSkill > totalTestSkill1 ? runnerOne.Name : runnerTwo.Name }`}`)
    
    }

}

async function declareWinner(RunnerOne, RunnerTwo) {
        console.log("=======================================")
        console.log("RESULTADO FINAL:  \n")
        console.log(`${RunnerOne.Name} fez ${RunnerOne.Points} Points 🔰`)
        console.log(`${RunnerTwo.Name} fez ${RunnerTwo.Points} Points 🔰`)
        console.log(`\n 🏆🏆 O vencedor é ${RunnerOne.Points > RunnerTwo.Points ? RunnerOne.Name : RunnerTwo.Name} 🏆🏆 \n`)
    }


async function drawCircuit() {
    let draw = Math.random()

    if (draw < 0.33) 
        return "Handling 🚩"

    if (draw < 0.66)
        return "Reta ⏩💨"

    if (draw < 0.99)
        return "Confronto 💥💢"

    }


    (async function main() {
    console.log(" 🌟====INICIALIZANDO CORRIDA!====🌟🏎🏎")
    let runnerOne = new Runner(drawRunnerId())
    let runnerTwo = new Runner(drawRunnerId())
    await PlayEngine(runnerOne, runnerTwo)
    await declareWinner(runnerOne, runnerTwo)

})()