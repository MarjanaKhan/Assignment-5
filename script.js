document.addEventListener('DOMContentLoaded', () => {
    // DOM elements
    const heartCountEl = document.getElementById('heart-count');
    const coinCountEl = document.getElementById('coin-count');
    const copyCountEl = document.getElementById('copy-count');
    const clearHistoryBtn = document.getElementById('clear-history-btn');
    const historyListEl = document.getElementById('history-list');
    const cardGridEl = document.getElementById('card-grid');

    // State variables
    let coins = 100;
    let hearts = 0;
    let copies = 0;

    // Service data
    const services = [
        { name: "National Emergency Number", enName: "National Emergency", number: "999", category: "All", icon: "assets/emergency.png" },
        { name: "Police Helpline Number", enName: "Police", number: "999", category: "Police", icon: "assets/police.png" },
        { name: "Fire Service Number", enName: "Fire Service", number: "999", category: "Fire Service", icon: "assets/fire-service.png" },
        { name: "Ambulance Service", enName: "Ambulance", number: "1994-999999", category: "Health", icon: "assets/ambulance.png" },
        { name: "Women & Child Helpline", enName: "Women & Child Helpline", number: "109", category: "Help", icon: "assets/emergency.png" },
        { name: "Anti-Corruption Helpline", enName: "Anti Corruption", number: "106", category: "Govt.", icon: "assets/emergency.png" },
        { name: "Electricity Helpline", enName: "Electricity Outage", number: "16216", category: "Electricity", icon: "assets/emergency.png" },
        { name: "Brac Helpline", enName: "Brac", number: "16445", category: "NGO", icon: "assets/brac.png" },
        { name: "Bangladesh Railway Helpline", enName: "Bangladesh Railway", number: "163", category: "Travel", icon: "assets/Bangladesh-Railway.png" },
    ];

    // Function to render all cards
    const renderCards = () => {
        cardGridEl.innerHTML = ''; // Clear existing cards
        services.forEach(service => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <div class="card-header">
                    <img src="${service.icon}" alt="${service.enName} Icon">
                    <i class="fas fa-heart heart-icon" data-name="${service.enName}"></i>
                </div>
                <div class="card-body">
                    <h4>${service.name}</h4>
                    <p>${service.enName}</p>
                    <h2 class="hotline-number">${service.number}</h2>
                    <span class="category-badge">${service.category}</span>
                    <div class="card-buttons">
                        <button class="copy-btn" data-number="${service.number}">
                            <i class="fas fa-copy"></i> Copy
                        </button>
                        <button class="call-btn" data-name="${service.enName}" data-number="${service.number}">
                            <i class="fas fa-phone-alt"></i> Call
                        </button>
                    </div>
                </div>
            `;
            cardGridEl.appendChild(card);
        });
    };

    // Function to update the counts in the navbar
    const updateCounts = () => {
        heartCountEl.textContent = hearts;
        coinCountEl.textContent = coins;
        copyCountEl.textContent = `${copies} Copy`;
    };

    // Function to add a new item to the call history
    const addHistoryItem = (serviceName, serviceNumber) => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        
        const now = new Date();
        const timeString = now.toLocaleTimeString();

        historyItem.innerHTML = `
            <span class="service-name">${serviceName}</span>
            <div class="call-details">
                <span class="service-number">${serviceNumber}</span>
                <span class="call-time">${timeString}</span>
            </div>
        `;
        historyListEl.prepend(historyItem); // Add to the top of the list
    };

    // Event Delegation for all card interactions
    cardGridEl.addEventListener('click', (e) => {
        const target = e.target;

        // Call Button functionality
        if (target.closest('.call-btn')) {
            const callBtn = target.closest('.call-btn');
            const serviceName = callBtn.dataset.name;
            const serviceNumber = callBtn.dataset.number;
            
            if (coins < 20) {
                alert("You don't have enough coins to make a call!");
                return;
            }

            coins -= 20;
            updateCounts();
            alert(`Calling ${serviceName} at ${serviceNumber}`);
            addHistoryItem(serviceName, serviceNumber);
        }

        // Copy Button functionality
        if (target.closest('.copy-btn')) {
            const copyBtn = target.closest('.copy-btn');
            const numberToCopy = copyBtn.dataset.number;
            navigator.clipboard.writeText(numberToCopy)
                .then(() => {
                    copies++;
                    updateCounts();
                    alert(`Copied number: ${numberToCopy}`);
                })
                .catch(err => {
                    console.error('Failed to copy text: ', err);
                });
        }

        // Heart Icon functionality
        if (target.closest('.heart-icon')) {
            const heartIcon = target.closest('.heart-icon');
            if (heartIcon.classList.contains('favorited')) {
                heartIcon.classList.remove('favorited');
                hearts--;
            } else {
                heartIcon.classList.add('favorited');
                hearts++;
            }
            updateCounts();
        }
    });

    // Clear History Button functionality
    clearHistoryBtn.addEventListener('click', () => {
        historyListEl.innerHTML = '';
    });

    // Initial render on page load
    renderCards();
    updateCounts();
});