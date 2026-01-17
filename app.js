// ============================================
// USER VERZEICHNIS APP
// ============================================

// === 1. DOM ELEMENTE SELEKTIEREN ===
const searchInput = document.querySelector('#search-input');
const loadBtn = document.querySelector('#load-btn');
const userList = document.querySelector('#user-list');
const statusEl = document.querySelector('#status');

// === 2. STATE (Daten-Speicher) ===
let allUsers = [];  // Hier speichern wir alle geladenen User

// === 3. API URL ===
const API_URL = 'https://randomuser.me/api/?results=10';

console.log('App geladen!');

// === 4. HILFSFUNKTIONEN ===

// Funktion: Status-Anzeige aktualisieren
const setStatus = (message, type = '') => {
    statusEl.textContent = message;

    // Alle Status-Klassen entfernen
    statusEl.classList.remove('loading', 'error', 'success');

    // Neue Klasse hinzufügen (wenn vorhanden)
    if (type) {
        statusEl.classList.add(type);
    }
};

// Funktion: Eine User-Karte erstellen (DOM-Elemente, XSS-sicher!)
const createUserCard = (user) => {
    // Destructuring: Daten aus dem User-Object extrahieren
    const { name, email, picture, location } = user;
    const fullName = `${name.first} ${name.last}`;
    const city = `${location.city}, ${location.country}`;

    // DOM-Elemente erstellen (sicherer als innerHTML!)
    const card = document.createElement('div');
    card.classList.add('user-card');

    const avatar = document.createElement('img');
    avatar.classList.add('user-avatar');
    avatar.src = picture.medium;
    avatar.alt = fullName;

    const info = document.createElement('div');
    info.classList.add('user-info');

    const nameEl = document.createElement('div');
    nameEl.classList.add('user-name');
    nameEl.textContent = fullName;  // textContent ist XSS-sicher!

    const emailEl = document.createElement('div');
    emailEl.classList.add('user-email');
    emailEl.textContent = email;

    const locationEl = document.createElement('div');
    locationEl.classList.add('user-location');
    locationEl.textContent = city;

    // Elemente zusammenfügen
    info.appendChild(nameEl);
    info.appendChild(emailEl);
    info.appendChild(locationEl);

    card.appendChild(avatar);
    card.appendChild(info);

    return card;
};

// Funktion: Alle User in der Liste anzeigen
const renderUsers = (users) => {
    // Liste leeren
    userList.innerHTML = '';

    // Wenn keine User vorhanden
    if (users.length === 0) {
        const placeholder = document.createElement('p');
        placeholder.classList.add('placeholder');
        placeholder.textContent = 'Keine User gefunden.';
        userList.appendChild(placeholder);
        return;
    }

    // Für jeden User eine Karte erstellen und anhängen
    users.forEach(user => {
        const card = createUserCard(user);
        userList.appendChild(card);
    });
};

// === 5. API FUNKTION ===

// Funktion: User von API laden
const loadUsers = async () => {
    // Loading State
    setStatus('Lade User...', 'loading');
    loadBtn.disabled = true;  // Button deaktivieren
    userList.innerHTML = '<p class="loading-spinner">Laden...</p>';

    try {
        // 1. Fetch-Request starten
        const response = await fetch(API_URL);

        // 2. Prüfen ob Request erfolgreich war
        if (!response.ok) {
            throw new Error(`HTTP Fehler: ${response.status}`);
        }

        // 3. JSON-Daten parsen
        const data = await response.json();

        // 4. User aus Response extrahieren
        allUsers = data.results;

        // 5. User anzeigen
        renderUsers(allUsers);

        // 6. Success Status
        setStatus(`${allUsers.length} User geladen`, 'success');

    } catch (error) {
        // Fehler abfangen und anzeigen
        console.error('Fehler beim Laden:', error);
        setStatus('Fehler beim Laden!', 'error');
        userList.innerHTML = '<p class="placeholder">Fehler beim Laden. Bitte erneut versuchen.</p>';

    } finally {
        // Button wieder aktivieren (egal ob Erfolg oder Fehler)
        loadBtn.disabled = false;
    }
};

// === 6. FILTER FUNKTION ===

// Funktion: User nach Namen filtern
const filterUsers = (searchTerm) => {
    // Noch keine User geladen? Dann nichts tun
    if (allUsers.length === 0) {
        return;
    }

    // Wenn kein Suchbegriff, zeige alle
    if (!searchTerm.trim()) {
        renderUsers(allUsers);
        setStatus(`${allUsers.length} User angezeigt`, 'success');
        return;
    }

    // Suchbegriff in Kleinbuchstaben
    const term = searchTerm.toLowerCase();

    // Array.filter() - nur User behalten, deren Name den Suchbegriff enthält
    const filtered = allUsers.filter(user => {
        const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();
        return fullName.includes(term);
    });

    // Gefilterte User anzeigen
    renderUsers(filtered);
    setStatus(`${filtered.length} von ${allUsers.length} User`, 'success');
};

// === 7. EVENT LISTENERS ===

// Button-Klick: User laden
loadBtn.addEventListener('click', () => {
    loadUsers();
});

// Input: Bei Eingabe filtern
searchInput.addEventListener('input', (e) => {
    // e.target.value ist der aktuelle Wert im Input-Feld
    const searchTerm = e.target.value;
    filterUsers(searchTerm);
});

// Optional: Enter-Taste im Suchfeld lädt auch User
searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && allUsers.length === 0) {
        loadUsers();
    }
});

// === 8. INITIALISIERUNG ===
console.log('User Verzeichnis App geladen!');