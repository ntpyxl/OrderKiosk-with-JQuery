document.addEventListener('DOMContentLoaded', function() {
    const scrollButton = document.getElementById('scrollOrderButton');
    const receiptSection = document.getElementById('receipt');
    const footerSection = document.getElementById('footer');

    function handleScroll() {
        const receiptPosition = receiptSection.getBoundingClientRect().top;
        const footerPosition = footerSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (receiptPosition < windowHeight || footerPosition < windowHeight) {
            scrollButton.classList.add('hidden');
        } else {
            scrollButton.classList.remove('hidden');
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();
});