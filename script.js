/**
 * Shibu Shalom B.P - Portfolio Interaction Script
 * - Interactive System & Architecture Inspector Tab Switcher
 * - Direct Web3Forms Contact Form Submission
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==================== 1. SYSTEM ARCHITECTURE INSPECTOR ==================== */
    const inspectorTabs = document.querySelectorAll('.inspector-tab');
    const inspectorPanels = document.querySelectorAll('.inspector-panel');

    inspectorTabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-tab');

            inspectorTabs.forEach((t) => t.classList.remove('active'));
            inspectorPanels.forEach((p) => p.classList.remove('active'));

            tab.classList.add('active');
            const activePanel = document.getElementById(`panel-${target}`);
            if (activePanel) {
                activePanel.classList.add('active');
            }
        });
    });

    /* ==================== 2. CLEAN CONTACT FORM SUBMISSION ==================== */
    const contactForm = document.getElementById('contactForm');
    const formSubmitBtn = document.getElementById('formSubmitBtn');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        const nameInput = document.getElementById('senderName');
        const emailInput = document.getElementById('senderEmail');
        const subjectInput = document.getElementById('senderSubject');
        const messageInput = document.getElementById('senderMessage');

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Clear previous errors
            ['nameError', 'emailError', 'subjectError', 'messageError'].forEach((id) => {
                const el = document.getElementById(id);
                if (el) el.textContent = '';
            });
            if (formStatus) formStatus.textContent = '';

            let isValid = true;

            if (!nameInput.value.trim()) {
                document.getElementById('nameError').textContent = 'Name is required.';
                isValid = false;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim()) {
                document.getElementById('emailError').textContent = 'Email is required.';
                isValid = false;
            } else if (!emailPattern.test(emailInput.value.trim())) {
                document.getElementById('emailError').textContent = 'Enter a valid email address.';
                isValid = false;
            }

            if (!subjectInput.value.trim()) {
                document.getElementById('subjectError').textContent = 'Subject is required.';
                isValid = false;
            }

            if (!messageInput.value.trim()) {
                document.getElementById('messageError').textContent = 'Message is required.';
                isValid = false;
            }

            if (!isValid) return;

            const originalBtnText = formSubmitBtn.textContent;
            formSubmitBtn.disabled = true;
            formSubmitBtn.textContent = 'Sending...';

            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        access_key: 'bc6429e2-0083-4e66-be5f-4ebeecc9a4aa',
                        name: nameInput.value.trim(),
                        email: emailInput.value.trim(),
                        subject: subjectInput.value.trim(),
                        message: messageInput.value.trim(),
                        from_name: 'Portfolio Contact Form'
                    })
                });

                const result = await response.json();

                if (result.success) {
                    formStatus.className = 'form-status success';
                    formStatus.textContent = 'Message sent successfully. I will get back to you shortly.';
                    contactForm.reset();
                } else {
                    formStatus.className = 'form-status error';
                    formStatus.textContent = result.message || 'Failed to send message. Please email directly.';
                }
            } catch (err) {
                formStatus.className = 'form-status error';
                formStatus.textContent = 'Network error. Please email directly to shibushalommp@gmail.com.';
            } finally {
                formSubmitBtn.disabled = false;
                formSubmitBtn.textContent = originalBtnText;
            }
        });
    }
});
