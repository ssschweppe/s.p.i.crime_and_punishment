document.addEventListener("DOMContentLoaded", function(){
    let croneHouse1 = document.querySelector('.crone_house');
    let popupClock = document.querySelector('.popup_clock');
    croneHouse1.addEventListener('click', function(){
        popupClock.style.display = 'block';
    });

    const gears = document.querySelectorAll('.gears');

    const blueGear = document.querySelector('.gear_yellow');

    blueGear.onmousedown = function(event) {

        let shiftX = event.clientX - blueGear.getBoundingClientRect().left;
        let shiftY = event.clientY - blueGear.getBoundingClientRect().top;
      
        moveAt(event.pageX, event.pageY);
      
        // переносит мяч на координаты (pageX, pageY),
        // дополнительно учитывая изначальный сдвиг относительно указателя мыши
        function moveAt(pageX, pageY) {
        blueGear.style.left = pageX - shiftX + 'px';
        blueGear.style.top = pageY - shiftY + 'px';
        }
      
        function onMouseMove(event) {
          moveAt(event.pageX, event.pageY);
        }
      
        // передвигаем мяч при событии mousemove
        document.addEventListener('mousemove', onMouseMove);
      
        // отпустить мяч, удалить ненужные обработчики
        blueGear.onmouseup = function() {
          document.removeEventListener('mousemove', onMouseMove);
          blueGear.onmouseup = null;
        };
      
      };
      
      blueGear.ondragstart = function() {
        return false;
      };

    const boxes = document.querySelectorAll('.box');

    boxes.forEach((box) => {
        box.addEventListener('dragover', (e) => {
            e.preventDefault();
        });
        box.addEventListener('drop', () => {
           gears.forEach((gear) => {
            box.appendChild(gear)
           });
        });
    });
});