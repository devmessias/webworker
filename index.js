if (typeof(Worker)==="undefined") {
    alert("Ops, your browser doesn't support HTML5 Web Worker! Please choose another modern browser and try again.");
}
var WebWorker={
    worker:false,
    criar(){
        if(this.worker){
            _renderMsg('Worker já foi criado');
            return
        }

        this.worker=new Worker('sort.js');
        _renderMsg(`Worker Criado. De uma olhada no console`);
        this.worker.addEventListener('message', function(e) {
            if(e.data.tipo=='sort'){


                afterStop(e.data.time,true);
            }else{

                _renderMsg(e.data);
            }
        }, false);

    },
    hi(){
        if(!this.worker){
            _renderMsg('Crie o Worker primeiro');
            return

        }
        this.worker.postMessage({action:'hi'});
    },
    start(){
        if(!this.worker){
            _renderMsg('Crie o Worker primeiro');
            return

        }

        this.worker.postMessage({action:'start'});
    },
    close(){
        if(!this.worker){
            _renderMsg('Crie o Worker primeiro');
            return
        }

        this.worker.postMessage({action:'die'});

        this.worker=false;
        console.log(this.worker);
    },
    terminate(){
        if(!this.worker){
            _renderMsg('Crie o Worker primeiro');
            return
        }

        this.worker.terminate();
        this.worker=false;
        console.log(this.worker);
    },
    sort(){
        if(!this.worker){
            _renderMsg('Crie o Worker primeiro');
            return

        }

        preStart();
        this.worker.postMessage({action:'sort'});
    }


}
function _renderMsg(texto){
    var message =`<div class="alert alert-success" role="alert">${texto}</div>`;
    $('#workerDialogue').append(message) ;

}
function nonWebWorker() {
    preStart();
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
    afterStop(time, false);
}
function preStart() {
    $("#resultBox").hide(500);
    $("#withWW").hide();
    $("#withoutWW").hide()
    $("#progressbar").show(500);
}
function afterStop(spentTime, mode) {
    $("#timespent").html(spentTime + "ms");
    $("#progressbar").hide(500, function() {
        mode ? $("#withWW").show() : $("#withoutWW").show();
        $("#resultBox").show(500);
    });
}
