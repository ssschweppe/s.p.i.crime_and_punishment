document.addEventListener("DOMContentLoaded", function(){
    const croneHouse1 = document.querySelector('.crone_house');
    const popupClock = document.querySelector('.popup_clock');
    croneHouse1.addEventListener('click', () => {
        popupClock.style.display = 'block';
    });

    const gears = document.querySelectorAll('.gears');
    const boxes = document.querySelectorAll('.box');

    gears.forEach(gear => {    
        gear.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', e.target.id || 'object');
            gear.classList.add('dragging');
        });
        gear.addEventListener('dragend', () => {
            gear.classList.remove('dragging'); 
          });
      });
    
    boxes.forEach((box) => { 
        box.addEventListener('dragstart', () => {
            return false;
        })
        box.addEventListener('dragover', (e) => {
            e.preventDefault();
        });
        box.addEventListener('drop', (e) => {
            e.preventDefault();
            const draggedGear = document.querySelector('.dragging');
            if (draggedGear) {
                box.appendChild(draggedGear);
                draggedGear.style.left = '50%';
                draggedGear.style.top = '50%';
                draggedGear.style.transform = 'translate(-50%, -50%)';    
            };

            const gearBlue = document.querySelector('.gear_blue');
            const gearPurple = document.querySelector('.gear_purple');
            const gearYellow = document.querySelector('.gear_yellow');

            if (document.querySelector('.box1').contains(gearBlue) &&
                document.querySelector('.box2').contains(gearPurple) &&
                document.querySelector('.box3').contains(gearYellow)) {
                    gearBlue.style.animation = '6s linear infinite rotate';
                    gearYellow.style.animation = '3s linear infinite rotate_reverse';
                    gearPurple.style.animation = '3s linear infinite rotate_reverse';
                    setTimeout(() => {
                        popupClock.style.display = 'none';
                    }, 4000)
            };
        });
    });

    const gearButton = document.querySelector('.btn');
    const boxOfBoxes = document.querySelector('.boxes');
    
    gearButton.addEventListener('click', () => {
    gears.forEach(gear => {
        boxOfBoxes.before(gear)
            gear.style.left = '';
            gear.style.top = '';
            gear.style.transform = '';
        });
    });
    const pub = document.querySelector('.pub_and_name');
    const popupPub = document.querySelector('.popup_dialogue_pub');
    const pubNextButton = document.querySelector('.popup_pub_next');
    const popupPubBackground = document.querySelector('.dialogue_pub_background');
    const popupPubText = document.querySelector('.popup_pub_text');

    pub.addEventListener('click', () => {
        popupPub.style.display = 'block';
    });

    pubNextButton.addEventListener('click', () => {
        popupPubBackground.src = './img/noname_says2.svg';
        popupPubText.textContent = 'даа, на ее деньги можно было бы помочь многим беднякам...';
        pubNextButton.style.display = 'none';
        setTimeout(() => {
            popupPub.style.display = 'none';
        }, 5000)
    });

    const popupLoop = document.querySelector('.popup_loop');
    const loop = document.querySelector('.loop');
    const raskolnikovHouse = document.querySelector('.raskolnikov_house');

    raskolnikovHouse.addEventListener('click', () => {
        popupLoop.style.display = 'block';
    });

    let shiftX, shiftY;

    const moveAt = (e) => {
        loop.style.cursor = 'grabbing';
        loop.style.left = e.clientX - shiftX - (window.innerWidth - popupLoop.offsetWidth) / 2 + 'px';
        loop.style.top = e.clientY - shiftY - (window.innerHeight - popupLoop.offsetHeight) / 2 + 'px';
    };
    
    loop.addEventListener('mousedown', (e) => {
        const rect = loop.getBoundingClientRect();
        shiftX = e.clientX - rect.left;
        shiftY = e.clientY - rect.top;
        moveAt(e);
        const onMouseMove = (e) => {
            moveAt(e);
        ;};
        const onMouseUp = (e) => {
            loop.style.cursor = 'grab';
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
            if (document.elementFromPoint(e.clientX, e.clientY) == document.querySelector('.box_for_loop')) {
                setTimeout(() => {
                    popupLoop.style.display = 'none';
                }, 400);
            };
        };
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });

    loop.ondragstart = () => {
        return false;
    };
    
    const croneHouse2 = document.querySelector('.crone_house2');
    const figures = document.querySelector('.figures');
    
    croneHouse2.addEventListener('click', () => {
        figures.style.display = 'flex';
        figures.style.animation = '1s ease-in-out alternate infinite move';
    });

    const popupPolice = document.querySelector('.popup_dialogue_police');
    const police = document.querySelector('.police_and_name');
    const policeNextButton = document.querySelector('.popup_police_next');
    const popupPoliceBackground = document.querySelector('.dialogue_police_background');
    const popupPoliceText = document.querySelector('.popup_police_text');
    const policePhrases = ['вы меня подозреваете?!?!??!?',
                        'нет, нет, что вы, родион романович! как вы могли подумать о подобном???',
                        'не мучьте меня!!! вы лжете, лжете, лжете. у вас нет доказательств!!! зачем вы это делаете?????',
                        'я лгу??? нет, нет, что вы! кстати, у меня есть для вас сюрпризик))))',
                        '...'];

    police.addEventListener('click', () => {
        popupPolice.style.display = 'block';
    });

    let whoSays = false;
    let phrase = 1;

    policeNextButton.addEventListener('click', () => {
        phrase += 1;
        if (whoSays) {
            popupPoliceBackground.src = './img/raskolnikov_says.svg';
            whoSays = false;
        } else {
                popupPoliceBackground.src = './img/porfiry_says.svg';
                whoSays = true;
        };
        console.log(phrase)
        if (phrase < policePhrases.length) {
            popupPoliceText.textContent = policePhrases[phrase - 1];
        } else {
            popupPoliceText.textContent = policePhrases[4];
            policeNextButton.style.display = 'none';
            setTimeout(() => {
                popupPolice.style.display = 'none';
            }, 3000)
        };
    });

    const sonyaHouse = document.querySelector('.sonya_and_name');
    const popupDrawing = document.querySelector('.popup_drawing');

    sonyaHouse.addEventListener('click', () => {
        popupDrawing.style.display = 'block';
        const canvas = document.querySelector('.canvas');
        const ctx = canvas.getContext('2d');
    
        const baseWidth = 800;
        const baseHeight = 300; 
    
        function resizeCanvas() {
            const container = canvas.parentElement;
            const containerWidth = container.clientWidth;
    
            canvas.width = containerWidth;
            canvas.height = (containerWidth * baseHeight) / baseWidth;
    
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        };
    
        resizeCanvas();
    
        window.addEventListener('resize', resizeCanvas);
    
    
        let isDrawing = false; 
    
        ctx.lineWidth = 10; 
        ctx.lineCap = 'round'; 
        ctx.strokeStyle = 'white'; 
    
        canvas.addEventListener('mousedown', (e) => {
            isDrawing = true;
            ctx.beginPath();
            ctx.moveTo(e.offsetX, e.offsetY);
            console.log('Mouse coordinates:', e.offsetX, e.offsetY); 
        });
    
        canvas.addEventListener('mousemove', (e) => {
            if (isDrawing) {
                ctx.lineTo(e.offsetX, e.offsetY);
                ctx.stroke(); 
            }
        });
    
        canvas.addEventListener('mouseup', () => {
            isDrawing = false;
            ctx.closePath();
        });
    
    });

    const drawingButton = document.querySelector('.btn2');
    drawingButton.addEventListener('click', () => {
        popupDrawing.style.display = 'none';
    });
    
});
