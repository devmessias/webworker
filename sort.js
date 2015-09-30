console.log('Log gerado dentro do worker, Worker Iniciado');
self.addEventListener('message',function(e){
    console.log('Worker iniciado');
    var data = e.data;
    switch (data.action) {
        case 'start':
            self.postMessage('Obrigado por me iniciar!: ');
        break;
        case 'hi':
            self.postMessage('Worker disse: Olá! ');
        break;
        case 'die':
            self.postMessage('Worker Finalizado, teste enviar um "oi" para o worker ');
        self.close(); // Terminates the worker.
        break;
        case 'sort':
    var a = [];
    for (var i = 50000; i >= 0; i--) {
        a.push(i);
    };
    function bubbleSort(a)
    {
        var swapped;
        do {
            swapped = false;
            for (var i=0; i < a.length-1; i++) {
                if (a[i] > a[i+1]) {
                    var temp = a[i];
                    a[i] = a[i+1];
                    a[i+1] = temp;
                    swapped = true;
                }
            }
        } while (swapped);
    }
    var start = new Date().getTime();
    bubbleSort(a);
    var end = new Date().getTime();
    var time = end - start;
    self.postMessage({tipo:'sort',time:time});

            break;

        default:
            console.log('Ação desconhecida');
    };
},false);

