document.addEventListener('DOMContentLoaded', () => {
    // Reveal Animations on Scroll
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;

        reveals.forEach(reveal => {
            const revealTop = reveal.getBoundingClientRect().top;

            if (revealTop < windowHeight - revealPoint) {
                reveal.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // FAQ Accordion
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isOpen = item.classList.contains('is-open');

            // Close all items
            document.querySelectorAll('.accordion-item').forEach(otherItem => {
                otherItem.classList.remove('is-open');
            });

            // Toggle clicked item
            if (!isOpen) {
                item.classList.add('is-open');
            }
        });
    });

    // Chat Simulation
    const chatBody = document.getElementById('chat-body');
    const messages = [
        { type: 'received', text: 'Tabii! Hangi gün için randevu istersiniz?' },
        { type: 'sent', text: 'Yarın öğleden sonra uygun mu?' },
        { type: 'received', text: 'Yarın 14:30 ve 16:00 saatleri boş. Hangisi olsun?' },
        { type: 'sent', text: '14:30 harika olur.' },
        { type: 'received', text: 'Randevunuz oluşturuldu! Yarın görüşmek üzere.' }
    ];

    let msgIndex = 0;

    const addMessage = () => {
        if (msgIndex >= messages.length) return;

        // Remove typing indicator if exists
        const typing = chatBody.querySelector('.typing');
        if (typing) typing.remove();

        const msg = messages[msgIndex];
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${msg.type}`;
        msgDiv.textContent = msg.text;
        chatBody.appendChild(msgDiv);

        // Scroll to bottom
        chatBody.scrollTop = chatBody.scrollHeight;

        msgIndex++;

        // Add typing indicator for next message if it's 'received'
        if (msgIndex < messages.length) {
            setTimeout(() => {
                const typeDiv = document.createElement('div');
                typeDiv.className = 'message received typing';
                typeDiv.innerHTML = '<span></span><span></span><span></span>';
                chatBody.appendChild(typeDiv);
                chatBody.scrollTop = chatBody.scrollHeight;

                setTimeout(addMessage, 2000);
            }, 1000);
        }
    };

    // Start simulation after a small delay
    setTimeout(addMessage, 3000);

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});
