AFRAME.registerComponent("aro-detected", {
    schema: {
      point: { type: "number", default: 0 }
    },
  
    init: function () {
      this.bird = document.querySelector("#esfera");
      this.puntosUI = document.querySelector("#puntos");
      this.resetButtom = document.querySelector("#reset-container");
      this.puntos = 0;
      this.vidas = 3;
      this.atravesados = new Set();
      this.tick = AFRAME.utils.throttleTick(this.detectarPaso, 300, this);
    },
  
    detectarPaso: function () {
      if (this.vidas <= 0) return;
  
      const birdPos = new THREE.Vector3();
      this.bird.object3D.getWorldPosition(birdPos);
  
      const aros = document.querySelectorAll(".aro");
  
      aros.forEach((aro, index) => {
        const aroPos = new THREE.Vector3();
        aro.object3D.getWorldPosition(aroPos);
  
        const distanciaX = Math.abs(birdPos.x - aroPos.x);
        const distanciaYZ = Math.sqrt(
          (birdPos.y - aroPos.y) ** 2 + (birdPos.z - aroPos.z) ** 2
        );
  
        const pasoCentro = distanciaX < 1.5 && distanciaYZ < 1.2;
        const fallo = distanciaX < 1.5 && distanciaYZ >= 1.2 && distanciaYZ < 4;
  
        // Si atraviesa correctamente y no ha sido contado antes
        if (pasoCentro && !this.atravesados.has(index)) {
          this.puntos++;
          this.atravesados.add(index);
          this.actualizarUI();
        }
  
        // Si falla al intentar pasar y tampoco se ha contado antes
        if (fallo && !this.atravesados.has(index)) {
          this.vidas--;
          this.atravesados.add(index);
          this.actualizarUI();
        }
      });
    },
  
    actualizarUI: function () {
      this.puntosUI.textContent = `PUNTOS: ${this.puntos} | VIDAS: ${this.vidas}`;
  
      if (this.vidas <= 0) {
        this.puntosUI.textContent += " | GAME OVER";
        // Aquí podrías añadir reinicio automático, sonido o detener el movimiento
        this.bird.setAttribute("dynamic-body", "mass", 0); // Detiene la esfera
      }
    },

      resetUI: function (e) {
      this.EventListener
    }

  });
   