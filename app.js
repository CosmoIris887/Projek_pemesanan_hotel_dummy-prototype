// Local Database Fallback (directly matching hotel.sql tables data)
const fallbackDb = {
  hotels: [
    { id: 1, name: "Hotel Mawar", location: "Bandung", description: "Hotel nyaman dekat pusat kota" },
    { id: 2, name: "Hotel Luxury", location: "Jakarta", description: "hotel mewah pokoknya mah" },
    { id: 3, name: "Hotel Sakura", location: "Yogyakarta", description: "Hotel estetik dengan nuansa Jepang" }
  ],
  room_types: [
    { id: 1, name: "Standard", description: "Kamar standar dengan fasilitas dasar" },
    { id: 2, name: "Deluxe", description: "Kamar lebih luas dan nyaman" },
    { id: 3, name: "Suite", description: "Kamar mewah dengan ruang tamu" }
  ],
  rooms: [
    { id: 1, hotel_id: 1, room_type_id: 1, room_number: "102", price: 500000.00 },
    { id: 2, hotel_id: 1, room_type_id: 2, room_number: "103", price: 800000.00 },
    { id: 3, hotel_id: 3, room_type_id: 1, room_number: "301", price: 250000.00 },
    { id: 4, hotel_id: 3, room_type_id: 1, room_number: "302", price: 450000.00 },
    { id: 5, hotel_id: 3, room_type_id: 2, room_number: "303", price: 700000.00 },
    { id: 6, hotel_id: 1, room_type_id: 2, room_number: "104", price: 100000.00 },
    { id: 7, hotel_id: 1, room_type_id: 3, room_number: "105", price: 100000.00 },
    { id: 8, hotel_id: 1, room_type_id: 3, room_number: "106", price: 100000.00 },
    { id: 9, hotel_id: 3, room_type_id: 2, room_number: "304", price: 100000.00 },
    { id: 10, hotel_id: 2, room_type_id: 3, room_number: "400", price: 300000.00 }
  ],
  users: [
    { id: 1, name: "Budi Santoso", email: "budi@gmail.com", password: "123" },
    { id: 2, name: "ujang", email: "ujang@gmail.com", password: "111" },
    { id: 3, name: "dadang", email: "dadang@gmail.com", password: "dadank123" },
    { id: 4, name: "rusdi", email: "rusdi@gmail.com", password: "rusdi123" }
  ]
};

// State Management
const state = {
  currentUser: null,
  token: null,
  currentLang: 'id',
  hotels: [],
  rooms: [],
  roomTypes: [],
  selectedHotel: null,
  selectedRoom: null,
  currentPendingBooking: null,
  timerInterval: null,
  captchaValue: null
};

// API routes
const API = {
  login: 'login.php',
  users: 'users.php',
  hotels: 'hotels.php',
  rooms: 'rooms.php',
  roomTypes: 'room_types.php',
  bookings: 'bookings.php',
  payments: 'payments.php'
};

const hotelImages = {
  1: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
  2: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
  3: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
  default: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80'
};

// Translations
const translations = {
  id: {
    loginSignUp: "Masuk / Daftar",
    signUpTitle: "Daftar Akun",
    loginTitle: "Masuk Akun",
    fullName: "Nama Lengkap",
    signUpButton: "Daftar",
    loginButton: "Masuk",
    haveAccount: "Sudah punya akun?",
    loginLink: "Masuk",
    noAccount: "Belum punya akun?",
    signUpLink: "Daftar Sekarang",
    searchPlaceholder: "Cari hotel berdasarkan nama atau lokasi...",
    searchLocation: "Lokasi / Nama Hotel",
    filterLocation: "Filter Lokasi",
    allLocations: "Semua Lokasi",
    searchButton: "Cari",
    availableHotels: "Daftar Hotel Tersedia",
    loadingHotels: "Memuat daftar hotel...",
    heroTitle: "Temukan Penginapan <span>Impian Anda</span>",
    heroDesc: "Nikmati kemewahan dan kenyamanan tiada tara di berbagai pilihan hotel terbaik kami dengan harga terbaik.",
    back: "Kembali",
    selectRoomType: "Pilih Jenis Kamar",
    bookingDetails: "Rincian Pemesanan",
    selectedRoom: "Kamar Terpilih",
    checkInDate: "Tanggal Check-in",
    nights: "Durasi Menginap (Malam)",
    checkOutDate: "Tanggal Check-out",
    pricePerNight: "Harga / Malam",
    nightsLabel: "Jumlah Malam",
    totalPrice: "Total Harga",
    bookNow: "Pesan Sekarang",
    cancel: "Batal",
    choosePayment: "Metode Pembayaran",
    timeRemaining: "Batas Waktu Pembayaran",
    confirmPayment: "Konfirmasi Pembayaran",
    hotel: "Hotel",
    room: "Kamar",
    simulationPanel: "Simulator Panel (Testing)",
    simTimeout: "Simulasi Timeout",
    simFail: "Simulasi Gagal",
    receiptSuccess: "Pembayaran Sukses!",
    receiptOrderSuccess: "Kamar Anda telah berhasil dipesan dan dikonfirmasi.",
    invoiceNumber: "Nomor Transaksi",
    receiptDate: "Tanggal Transaksi",
    paymentMethod: "Metode Pembayaran",
    amountPaid: "Total yang Dibayar",
    backToDashboard: "Kembali ke Dashboard",
    viewMyBookings: "Lihat Riwayat Transaksi",
    profile: "Profil Saya",
    saldo: "Saldo Saya",
    topUp: "Top Up",
    myBookingDetails: "Detail Pesanan Saya",
    totalOrders: "Total Pesanan",
    unpaid: "Belum Bayar",
    pending: "Pending",
    success: "Success",
    totalSuccessPurchases: "Total Belanja Sukses",
    transactionHistory: "Riwayat Transaksi",
    noTransactions: "Belum ada transaksi.",
    changeProfile: "Ubah Email & Password",
    newEmail: "Email Baru",
    oldPassword: "Password Lama",
    newPassword: "Password Baru",
    updateButton: "Simpan Perubahan",
    logout: "Keluar",
    captchaQuestion: "Apakah Anda manusia?",
    refreshCaptcha: "Acak",
    captchaAnswer: "Jawaban...",
    from: "Mulai dari",
    night: "malam",
    toastLoginSuccess: "Login berhasil! Selamat datang,",
    toastLoginFail: "Login gagal! Periksa email dan password Anda.",
    toastSignUpSuccess: "Pendaftaran berhasil! Silakan login.",
    toastSignUpFail: "Pendaftaran gagal! Email mungkin sudah digunakan.",
    toastCaptchaFail: "Jawaban CAPTCHA salah! Silakan coba lagi.",
    toastTopUpSuccess: "Top up berhasil! Saldo ditambahkan.",
    toastProfileUpdateSuccess: "Profil berhasil diperbarui!",
    toastProfileUpdateFail: "Gagal memperbarui profil. Sandi lama salah.",
    toastBookingSuccess: "Pemesanan berhasil dibuat! Selesaikan pembayaran.",
    toastBookingFail: "Gagal membuat pemesanan. Kamar mungkin sudah dipesan.",
    toastPaymentSuccess: "Pembayaran terkonfirmasi! Terima kasih.",
    toastPaymentFailed: "Pembayaran gagal atau dibatalkan.",
    toastTimeout: "Waktu pembayaran telah habis. Pemesanan dibatalkan.",
    mainMenu: "Menu Utama",
    beranda: "Beranda",
    riwayat: "Riwayat",
    profileInfo: "Info Profile",
    memberRegular: "Member Regular",
    liveNotif: "Live Notif Website",
    username: "Username",
    usernameWarning: "Username tidak dapat diganti",
    whatsapp: "Whatsapp",
    simpan: "Simpan",
    changePassword: "Ganti Password",
    repeatNewPassword: "Ulangi Password Baru",
    qrisInstruction: "Pindai kode QR di atas menggunakan aplikasi e-wallet (GoPay, OVO, Dana, LinkAja) atau m-banking Anda untuk menyelesaikan pembayaran.",
    receiptSuccessCash: "Pemesanan Berhasil!",
    receiptOrderSuccessCash: "Silakan tunjukkan struk ini dan lakukan pembayaran tunai ke petugas resepsionis saat check-in.",
    amountToPay: "Total yang Harus Dibayar",
    cashTimerLabel: "Sisa Waktu Check-In Konfirmasi Kehadiran",
    pleaseEnterPhone: "Silakan masukkan nomor handphone terlebih dahulu!",
    invalidPhone: "Nomor handphone tidak valid!"
  },
  en: {
    loginSignUp: "Login / Sign Up",
    signUpTitle: "Sign Up Account",
    loginTitle: "Login Account",
    fullName: "Full Name",
    signUpButton: "Sign Up",
    loginButton: "Login",
    haveAccount: "Already have an account?",
    loginLink: "Login",
    noAccount: "Don't have an account?",
    signUpLink: "Sign Up Now",
    searchPlaceholder: "Search hotels by name or location...",
    searchLocation: "Location / Hotel Name",
    filterLocation: "Filter Location",
    allLocations: "All Locations",
    searchButton: "Search",
    availableHotels: "Available Hotels",
    loadingHotels: "Loading hotels...",
    heroTitle: "Find Your <span>Dream Stay</span>",
    heroDesc: "Experience premium luxury and comfort in our handpicked selections of world-class hotels.",
    back: "Back",
    selectRoomType: "Select Room Type",
    bookingDetails: "Booking Details",
    selectedRoom: "Selected Room",
    checkInDate: "Check-in Date",
    nights: "Number of Nights",
    checkOutDate: "Check-out Date",
    pricePerNight: "Price / Night",
    nightsLabel: "Nights Count",
    totalPrice: "Total Price",
    bookNow: "Book Now",
    cancel: "Cancel",
    choosePayment: "Payment Methods",
    timeRemaining: "Payment Countdown Timer",
    confirmPayment: "Confirm Payment",
    hotel: "Hotel",
    room: "Room",
    simulationPanel: "Simulation Panel (Testing)",
    simTimeout: "Simulate Timeout",
    simFail: "Simulate Fail",
    receiptSuccess: "Payment Successful!",
    receiptOrderSuccess: "Your room has been successfully booked and confirmed.",
    invoiceNumber: "Transaction Invoice",
    receiptDate: "Transaction Date",
    paymentMethod: "Payment Method",
    amountPaid: "Total Amount Paid",
    backToDashboard: "Back to Dashboard",
    viewMyBookings: "View Transaction History",
    profile: "My Profile",
    saldo: "My Balance",
    topUp: "Top Up",
    myBookingDetails: "My Bookings Details",
    totalOrders: "Total Orders",
    unpaid: "Unpaid",
    pending: "Pending",
    success: "Success",
    totalSuccessPurchases: "Total Successful Purchases",
    transactionHistory: "Transaction History",
    noTransactions: "No transaction records.",
    changeProfile: "Change Email & Password",
    newEmail: "New Email Address",
    oldPassword: "Old Password",
    newPassword: "New Password",
    updateButton: "Save Changes",
    logout: "Log Out",
    captchaQuestion: "Are you human?",
    refreshCaptcha: "Refresh",
    captchaAnswer: "Answer...",
    from: "Starts from",
    night: "night",
    toastLoginSuccess: "Login successful! Welcome,",
    toastLoginFail: "Login failed! Please check your email and password.",
    toastSignUpSuccess: "Sign up successful! Please log in.",
    toastSignUpFail: "Sign up failed! Email might already be registered.",
    toastCaptchaFail: "Wrong CAPTCHA answer! Please try again.",
    toastTopUpSuccess: "Top up successful! Balance added.",
    toastProfileUpdateSuccess: "Profile updated successfully!",
    toastProfileUpdateFail: "Failed updating profile. Incorrect old password.",
    toastBookingSuccess: "Booking created! Please complete payment.",
    toastBookingFail: "Failed creating booking. Room might be occupied.",
    toastPaymentSuccess: "Payment confirmed! Thank you.",
    toastPaymentFailed: "Payment failed or cancelled.",
    toastTimeout: "Payment time limit expired. Booking cancelled.",
    mainMenu: "Main Menu",
    beranda: "Home",
    riwayat: "History",
    profileInfo: "Profile Info",
    memberRegular: "Regular Member",
    liveNotif: "Live Website Notification",
    username: "Username",
    usernameWarning: "Username cannot be changed",
    whatsapp: "Whatsapp",
    simpan: "Save",
    changePassword: "Change Password",
    repeatNewPassword: "Repeat New Password",
    qrisInstruction: "Scan the QR code above using your e-wallet (GoPay, OVO, Dana, LinkAja) or m-banking application to complete the payment.",
    receiptSuccessCash: "Booking Successful!",
    receiptOrderSuccessCash: "Please show this receipt and make cash payment to the receptionist during check-in.",
    amountToPay: "Total to Pay",
    cashTimerLabel: "Remaining Time to Check-in & Confirm Arrival",
    pleaseEnterPhone: "Please enter your mobile phone number first!",
    invalidPhone: "Invalid mobile phone number!"
  }
};

const isLocalFile = window.location.protocol === 'file:';
let localBase = 'http://localhost/projek_hotel/';
if (isLocalFile) {
  const path = window.location.pathname.replace(/\\/g, '/');
  const htdocsIndex = path.toLowerCase().indexOf('/htdocs/');
  if (htdocsIndex !== -1) {
    const subPath = path.substring(htdocsIndex + 8, path.lastIndexOf('/') + 1);
    localBase = 'http://localhost/' + subPath;
  }
}
const BASE_URL = isLocalFile ? localBase : '';

// Custom JSON cleaner
function parseBackendJSON(text) {
  text = text.trim();
  try {
    return JSON.parse(text);
  } catch (e) {
    const jsonObjects = [];
    let depth = 0;
    let start = 0;
    let inString = false;
    let escape = false;

    for (let i = 0; i < text.length; i++) {
      let char = text[i];
      if (escape) { escape = false; continue; }
      if (char === '\\') { escape = true; continue; }
      if (char === '"') { inString = !inString; continue; }
      if (!inString) {
        if (char === '{' || char === '[') {
          if (depth === 0) start = i;
          depth++;
        } else if (char === '}' || char === ']') {
          depth--;
          if (depth === 0) {
            jsonObjects.push(text.substring(start, i + 1));
          }
        }
      }
    }

    if (jsonObjects.length > 0) {
      try {
        return JSON.parse(jsonObjects[jsonObjects.length - 1]);
      } catch (err) {
        console.error("Concat parsing failed", err);
      }
    }
    throw e;
  }
}

// Simulated client-side DB driver for file:// protocol
function simulateLocalRequest(url, options = {}) {
  const method = options.method || 'GET';
  const body = options.body ? JSON.parse(options.body) : null;
  const urlObj = new URL(url, window.location.href);
  const path = urlObj.pathname.split('/').pop();

  if (!localStorage.getItem('grand_luxe_users')) {
    localStorage.setItem('grand_luxe_users', JSON.stringify(fallbackDb.users));
  }
  const simulatedUsers = JSON.parse(localStorage.getItem('grand_luxe_users'));

  if (!localStorage.getItem('grand_luxe_bookings')) {
    localStorage.setItem('grand_luxe_bookings', JSON.stringify([]));
  }
  const simulatedBookings = JSON.parse(localStorage.getItem('grand_luxe_bookings'));

  if (!localStorage.getItem('grand_luxe_payments')) {
    localStorage.setItem('grand_luxe_payments', JSON.stringify([]));
  }
  const simulatedPayments = JSON.parse(localStorage.getItem('grand_luxe_payments'));

  if (path === API.login) {
    const matched = simulatedUsers.find(u => u.email === body.email && u.password === body.password);
    if (matched) {
      return { message: "Login successful", result: matched, token: "simulated_jwt_token" };
    } else {
      return { message: "User tidak ditemukan, daftar terlebih dahulu" };
    }
  }

  if (path === API.users) {
    if (method === 'POST') {
      const duplicate = simulatedUsers.find(u => u.email === body.email);
      if (duplicate) {
        return { message: "Ada duplikasi!", "status code": 403 };
      }
      const newUser = { id: simulatedUsers.length + 1, name: body.name, email: body.email, password: body.password };
      simulatedUsers.push(newUser);
      localStorage.setItem('grand_luxe_users', JSON.stringify(simulatedUsers));
      return { message: "User berhasil ditambahkan", "status code": 201 };
    }

    if (method === 'PUT') {
      const idx = simulatedUsers.findIndex(u => u.id == body.id);
      if (idx !== -1) {
        simulatedUsers[idx] = { id: body.id, name: body.name, email: body.email, password: body.password };
        localStorage.setItem('grand_luxe_users', JSON.stringify(simulatedUsers));
        return { message: "User berhasil diupdate", "status code": 201 };
      }
      return { message: "User tidak ditemukan!", "status code": 403 };
    }
  }

  if (path === API.hotels) {
    return fallbackDb.hotels;
  }

  if (path === API.rooms) {
    const hId = urlObj.searchParams.get('hotel_id');
    if (hId) {
      return fallbackDb.rooms.filter(r => r.hotel_id == hId);
    }
    return fallbackDb.rooms;
  }

  if (path === API.roomTypes) {
    return fallbackDb.room_types;
  }

  if (path === API.bookings) {
    if (method === 'GET') {
      const uId = urlObj.searchParams.get('user_id');
      if (uId) {
        return simulatedBookings.filter(b => b.user_id == uId);
      }
      return simulatedBookings;
    }

    if (method === 'POST') {
      const duplicate = simulatedBookings.find(b => b.room_id == body.room_id && b.status === 'pending');
      if (duplicate) {
        return { message: "room_id duplikat!", "status code": 403 };
      }

      const newBooking = {
        id: simulatedBookings.length + 18,
        user_id: body.user_id,
        hotel_id: body.hotel_id,
        room_id: body.room_id,
        check_in: new Date().toISOString().split('T')[0],
        check_out: null,
        total_price: body.total_price,
        status: body.status,
        created_at: new Date().toISOString()
      };

      simulatedBookings.push(newBooking);
      localStorage.setItem('grand_luxe_bookings', JSON.stringify(simulatedBookings));
      return { message: "Booking berhasil ditambahkan" };
    }

    if (method === 'PUT') {
      const idx = simulatedBookings.findIndex(b => b.id == body.id);
      if (idx !== -1) {
        simulatedBookings[idx].check_in = body.check_in;
        simulatedBookings[idx].check_out = body.check_out;
        simulatedBookings[idx].status = body.status;
        simulatedBookings[idx].total_price = body.total_price;
        localStorage.setItem('grand_luxe_bookings', JSON.stringify(simulatedBookings));
        return { message: "Booking berhasil diupdate" };
      }
      return { message: "ID tidak ditemukan" };
    }
  }

  if (path === API.payments) {
    if (method === 'POST') {
      const newPay = {
        id: simulatedPayments.length + 1,
        booking_id: body.booking_id,
        amount: body.amount,
        payment_date: body.payment_date,
        payment_method: body.payment_method,
        status: body.status
      };
      simulatedPayments.push(newPay);
      localStorage.setItem('grand_luxe_payments', JSON.stringify(simulatedPayments));
      return { message: "Payment berhasil ditambahkan" };
    }
    if (method === 'PUT') {
      const idx = simulatedPayments.findIndex(p => p.id == body.id || p.booking_id == body.booking_id);
      if (idx !== -1) {
        simulatedPayments[idx].status = body.status;
        simulatedPayments[idx].payment_date = body.payment_date;
        localStorage.setItem('grand_luxe_payments', JSON.stringify(simulatedPayments));
        return { message: "Payment berhasil diupdate" };
      }
      const newPay = {
        id: simulatedPayments.length + 1,
        booking_id: body.booking_id,
        amount: body.amount,
        payment_date: body.payment_date,
        payment_method: body.payment_method,
        status: body.status
      };
      simulatedPayments.push(newPay);
      localStorage.setItem('grand_luxe_payments', JSON.stringify(simulatedPayments));
      return { message: "Payment berhasil ditambahkan" };
    }
    if (method === 'GET') {
      const bId = urlObj.searchParams.get('booking_id');
      if (bId) {
        return simulatedPayments.filter(p => p.booking_id == bId);
      }
      return simulatedPayments;
    }
  }

  return { error: true, message: "Endpoint simulation error" };
}

// Auth Request wrapper
async function request(url, options = {}) {
  const targetUrl = url.startsWith('http') ? url : BASE_URL + url;

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  if (state.token) {
    headers['Authorization'] = `Bearer ${state.token}`;
  }

  const response = await fetch(targetUrl, { ...options, headers });
  const rawText = await response.text();

  try {
    return parseBackendJSON(rawText);
  } catch (err) {
    console.error("Failed to parse backend output", rawText);
    return { error: true, message: "Backend error", raw: rawText };
  }
}

// Notification Toasts
function showToast(key, type = 'info', dynamicVal = '') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  const text = translations[state.currentLang][key] || key;
  toast.innerText = dynamicVal ? `${text} ${dynamicVal}` : text;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'slideIn 0.3s ease-out reverse forwards';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Populate Translate values
function updatePageLanguage() {
  document.querySelectorAll('[data-translate]').forEach(el => {
    const key = el.getAttribute('data-translate');
    if (translations[state.currentLang][key]) {
      if (el.innerHTML.includes('<span>') || el.innerHTML.includes('</span>')) {
        const regex = /<span>(.*?)<\/span>/g;
        const spanMatch = el.innerHTML.match(regex);
        let trText = translations[state.currentLang][key];
        if (spanMatch && trText.includes('<span>')) {
          el.innerHTML = trText;
        } else {
          el.innerText = trText;
        }
      } else {
        el.innerText = translations[state.currentLang][key];
      }
    }
  });

  document.querySelectorAll('[data-translate-placeholder]').forEach(el => {
    const key = el.getAttribute('data-translate-placeholder');
    if (translations[state.currentLang][key]) {
      el.setAttribute('placeholder', translations[state.currentLang][key]);
    }
  });

  document.getElementById('langText').innerText = state.currentLang === 'id' ? 'EN' : 'ID';
}

// Captcha math
function generateCaptcha() {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  state.captchaValue = num1 + num2;
  const questEl = document.getElementById('captchaMathQuestion');
  if (questEl) {
    questEl.innerText = `${num1} + ${num2} = `;
  }
  const ansEl = document.getElementById('captchaAnswer');
  if (ansEl) ansEl.value = '';
  const statEl = document.getElementById('captchaStatus');
  if (statEl) statEl.innerText = '';
}

function formatRupiah(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(amount);
}

function formatDate(dateStr) {
  if (!dateStr) return '-';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateStr).toLocaleDateString(state.currentLang === 'id' ? 'id-ID' : 'en-US', options);
}

// Session Sync
function initUserSession() {
  const localLang = localStorage.getItem('grand_luxe_lang');
  if (localLang) {
    state.currentLang = localLang;
  }

  const localUser = localStorage.getItem('grand_luxe_user');
  const localToken = localStorage.getItem('grand_luxe_token');

  if (localUser && localToken) {
    state.currentUser = JSON.parse(localUser);
    state.token = localToken;
  } else {
    state.currentUser = null;
    state.token = null;
  }

  renderUserNav();
}

function renderUserNav() {
  const authArea = document.getElementById('navAuthArea');
  if (!authArea) return;

  if (state.currentUser) {
    const userBalance = getVirtualBalance(state.currentUser.id);
    const initial = state.currentUser.name.charAt(0).toUpperCase();

    authArea.innerHTML = `
      <div class="user-widget" id="userProfileWidget" onclick="window.location.href='profile.html'">
        <div class="user-avatar">${initial}</div>
        <span class="user-balance" id="navBalanceVal">${formatRupiah(userBalance)}</span>
      </div>
    `;
  } else {
    authArea.innerHTML = `
      <button class="btn btn-primary" id="openAuthModalBtn" data-translate="loginSignUp">
        ${translations[state.currentLang].loginSignUp}
      </button>
    `;

    document.getElementById('openAuthModalBtn').addEventListener('click', () => {
      openModal('authModal');
    });
  }
}

// Modals controller
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add('active');
  if (modalId === 'authModal') {
    generateCaptcha();
    showAuthForm('signUp');
  }
}

let cashTimerIntervals = {};

function startCashCountdown(booking, displayElId, containerElId) {
  const container = document.getElementById(containerElId);
  const display = document.getElementById(displayElId);
  if (!container || !display) return;

  if (cashTimerIntervals[displayElId]) {
    clearInterval(cashTimerIntervals[displayElId]);
  }

  const checkInDateStr = booking.check_in;
  if (!checkInDateStr) {
    container.style.display = 'none';
    return;
  }

  const targetTime = new Date(checkInDateStr + 'T22:00:00');
  const labelEl = document.getElementById(displayElId.replace('Val', 'Label'));
  if (labelEl) {
    labelEl.innerText = translations[state.currentLang].cashTimerLabel || "Sisa Waktu Check-In Konfirmasi Kehadiran";
  }

  function updateTimer() {
    const now = new Date();
    const diff = targetTime - now;

    if (diff <= 0) {
      display.innerText = state.currentLang === 'id' ? "Batas Waktu Check-in Habis" : "Check-in Deadline Expired";
      clearInterval(cashTimerIntervals[displayElId]);
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const pad = (num) => String(num).padStart(2, '0');

    let timeStr = '';
    if (state.currentLang === 'id') {
      timeStr = `${days} Hari ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    } else {
      timeStr = `${days} Days ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    }
    display.innerText = timeStr;
  }

  container.style.display = 'block';
  updateTimer();
  cashTimerIntervals[displayElId] = setInterval(updateTimer, 1000);
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('active');
  if (modalId === 'receiptModal') {
    if (cashTimerIntervals['modalReceiptCashCountdownVal']) {
      clearInterval(cashTimerIntervals['modalReceiptCashCountdownVal']);
      delete cashTimerIntervals['modalReceiptCashCountdownVal'];
    }
  }
}

function showAuthForm(mode) {
  const signupForm = document.getElementById('signUpForm');
  const loginForm = document.getElementById('loginForm');
  const title = document.getElementById('authModalTitle');

  if (mode === 'signUp') {
    if (signupForm) signupForm.style.display = 'flex';
    if (loginForm) loginForm.style.display = 'none';
    if (title) title.innerText = translations[state.currentLang].signUpTitle;
    generateCaptcha();
  } else {
    if (signupForm) signupForm.style.display = 'none';
    if (loginForm) loginForm.style.display = 'flex';
    if (title) title.innerText = translations[state.currentLang].loginTitle;
  }
}

function getVirtualBalance(userId) {
  const balances = JSON.parse(localStorage.getItem('grand_luxe_balances') || '{}');
  if (balances[userId] === undefined) {
    balances[userId] = 3110; // Match screenshot starting balance (Rp 3.110 dummy data!)
    localStorage.setItem('grand_luxe_balances', JSON.stringify(balances));
  }
  return balances[userId];
}

function updateVirtualBalance(userId, newBalance) {
  const balances = JSON.parse(localStorage.getItem('grand_luxe_balances') || '{}');
  balances[userId] = newBalance;
  localStorage.setItem('grand_luxe_balances', JSON.stringify(balances));

  const navVal = document.getElementById('navBalanceVal');
  if (navVal) navVal.innerText = formatRupiah(newBalance);

  const profileVal = document.getElementById('profileBalance');
  if (profileVal) profileVal.innerText = formatRupiah(newBalance);
}

// ----------------------------------------------------
// Page Specific Initializers
// ----------------------------------------------------

// 1. DASHBOARD CONTROLLER
async function initDashboard() {
  const grid = document.getElementById('hotelGrid');
  if (!grid) return;

  try {
    const hotels = await request(API.hotels);
    const rooms = await request(API.rooms);

    state.hotels = hotels;
    state.rooms = rooms;

    renderHotelGrid(hotels);
    populateLocationFilter(hotels);
  } catch (err) {
    console.error("Error loading dashboard content", err);
    grid.innerHTML = `<p style="grid-column:1/-1; text-align:center; color:var(--danger);">Gagal memuat hotel. Pastikan database dan backend XAMPP Anda aktif.</p>`;
  }
}

function populateLocationFilter(hotels) {
  const select = document.getElementById('locationFilter');
  if (!select) return;

  const locations = [...new Set(hotels.map(h => h.location))];
  select.innerHTML = `<option value="">${translations[state.currentLang].allLocations}</option>`;
  locations.forEach(loc => {
    const opt = document.createElement('option');
    opt.value = loc;
    opt.innerText = loc;
    select.appendChild(opt);
  });
}

function renderHotelGrid(hotelsList) {
  const grid = document.getElementById('hotelGrid');
  if (!grid) return;
  grid.innerHTML = '';

  if (hotelsList.length === 0) {
    grid.innerHTML = `<p style="grid-column:1/-1; text-align:center; padding: 2rem; color:var(--text-muted);">Tidak ada hotel ditemukan.</p>`;
    return;
  }

  hotelsList.forEach(hotel => {
    const hotelRooms = state.rooms.filter(r => r.hotel_id == hotel.id);
    let minPriceStr = 'Rp 0';
    if (hotelRooms.length > 0) {
      const minPrice = Math.min(...hotelRooms.map(r => parseFloat(r.price)));
      minPriceStr = formatRupiah(minPrice);
    }

    const card = document.createElement('div');
    card.className = 'hotel-card';
    card.innerHTML = `
      <div class="hotel-image-container">
        <img class="hotel-image" src="${hotelImages[hotel.id] || hotelImages.default}" alt="${hotel.name}">
        <span class="hotel-badge">★ Premium</span>
      </div>
      <div class="hotel-info">
        <div class="hotel-location">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1115 0z" />
          </svg>
          <span>${hotel.location}</span>
        </div>
        <h3 class="hotel-name">${hotel.name}</h3>
        <p class="hotel-description">${hotel.description}</p>
        <div class="hotel-footer">
          <div class="hotel-price-from">
            <span class="hotel-price-label">${translations[state.currentLang].from}</span>
            <span class="hotel-price-amount">${minPriceStr} / ${translations[state.currentLang].night}</span>
          </div>
        </div>
      </div>
    `;

    card.addEventListener('click', () => {
      localStorage.setItem('grand_luxe_selected_hotel_id', hotel.id);
      window.location.href = 'hotel_detail.html';
    });
    grid.appendChild(card);
  });
}

// 2. HOTEL DETAIL CONTROLLER
async function initHotelDetail() {
  const nameEl = document.getElementById('detailHotelName');
  if (!nameEl) return;

  const hotelId = localStorage.getItem('grand_luxe_selected_hotel_id');
  if (!hotelId) {
    window.location.href = 'index.html';
    return;
  }

  try {
    state.hotels = await request(API.hotels);
    state.rooms = await request(API.rooms);
    state.roomTypes = await request(API.roomTypes);

    const hotel = state.hotels.find(h => h.id == hotelId);
    if (!hotel) {
      window.location.href = 'index.html';
      return;
    }

    state.selectedHotel = hotel;

    document.getElementById('detailHotelName').innerText = hotel.name;
    document.getElementById('detailHotelLocation').innerText = hotel.location;
    document.getElementById('detailHotelDesc').innerText = hotel.description;
    document.getElementById('detailGallery').innerHTML = `<img src="${hotelImages[hotel.id] || hotelImages.default}" alt="${hotel.name}">`;

    const hotelRooms = state.rooms.filter(r => r.hotel_id == hotelId);
    const listContainer = document.getElementById('roomTypesList');
    listContainer.innerHTML = '';

    if (hotelRooms.length === 0) {
      listContainer.innerHTML = `<p style="color:var(--text-muted);">Tidak ada kamar tersedia.</p>`;
    } else {
      hotelRooms.forEach(room => {
        const typeInfo = state.roomTypes.find(t => t.id == room.room_type_id) || { name: 'Standard', description: 'Kamar nyaman' };

        const rCard = document.createElement('div');
        rCard.className = 'room-type-card';
        rCard.innerHTML = `
          <div class="room-type-info">
            <div class="room-type-name">
              <span>${typeInfo.name}</span>
              <span class="room-type-badge">No. ${room.room_number}</span>
            </div>
            <span class="room-type-desc">${typeInfo.description}</span>
          </div>
          <div class="room-type-price-block">
            <span class="room-type-price">${formatRupiah(room.price)}</span>
            <span class="room-type-unit">/ ${translations[state.currentLang].night}</span>
          </div>
        `;

        rCard.addEventListener('click', () => {
          document.querySelectorAll('.room-type-card').forEach(c => c.classList.remove('selected'));
          rCard.classList.add('selected');

          state.selectedRoom = room;
          document.getElementById('bookingSelectedRoom').value = `${typeInfo.name} (Kamar ${room.room_number})`;
          calculateBookingPrice();
        });
        listContainer.appendChild(rCard);
      });
    }

    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    document.getElementById('checkInInput').min = todayStr;
    document.getElementById('checkInInput').value = todayStr;
    document.getElementById('nightsInput').value = 1;
    updateCheckoutDate();

  } catch (err) {
    console.error("Detail load error", err);
  }
}

function updateCheckoutDate() {
  const checkIn = document.getElementById('checkInInput').value;
  const nights = parseInt(document.getElementById('nightsInput').value) || 0;

  if (checkIn && nights > 0) {
    const d = new Date(checkIn);
    d.setDate(d.getDate() + nights);
    document.getElementById('checkOutOutput').value = d.toISOString().split('T')[0];
  } else {
    document.getElementById('checkOutOutput').value = '';
  }
  calculateBookingPrice();
}

function calculateBookingPrice() {
  const nights = parseInt(document.getElementById('nightsInput').value) || 0;
  const priceEl = document.getElementById('summaryPricePerNight');
  const nightsEl = document.getElementById('summaryNights');
  const totalEl = document.getElementById('summaryTotalPrice');

  if (state.selectedRoom && nights > 0) {
    const price = parseFloat(state.selectedRoom.price);
    const total = price * nights;

    priceEl.innerText = formatRupiah(price);
    nightsEl.innerText = `${nights}x ${state.currentLang === 'id' ? 'Malam' : 'Nights'}`;
    totalEl.innerText = formatRupiah(total);
  } else {
    priceEl.innerText = 'Rp 0';
    nightsEl.innerText = '0x';
    totalEl.innerText = 'Rp 0';
  }
}

async function startBookingFlow() {
  if (!state.currentUser) {
    showToast('loginSignUp', 'warning');
    openModal('authModal');
    return;
  }

  if (!state.selectedRoom) {
    showToast('selectRoomType', 'warning');
    return;
  }

  const checkIn = document.getElementById('checkInInput').value;
  const nights = parseInt(document.getElementById('nightsInput').value) || 0;
  const checkOut = document.getElementById('checkOutOutput').value;

  if (!checkIn || nights <= 0) {
    showToast('checkInDate', 'warning');
    return;
  }

  const totalPrice = parseFloat(state.selectedRoom.price) * nights;

  const postData = {
    user_id: state.currentUser.id,
    hotel_id: state.selectedHotel.id,
    room_id: state.selectedRoom.id,
    total_price: totalPrice,
    status: 'pending'
  };

  const resPost = await request(API.bookings, {
    method: 'POST',
    body: JSON.stringify(postData)
  });

  if (resPost.error || (resPost.message && (resPost.message.includes("Gagal") || resPost.message.includes("duplikat")))) {
    showToast('toastBookingFail', 'error');
    return;
  }

  const allBookings = await request(`${API.bookings}?user_id=${state.currentUser.id}`);
  const matching = allBookings.filter(b => b.room_id == state.selectedRoom.id && b.status === 'pending');
  matching.sort((a, b) => b.id - a.id);

  if (matching.length === 0) {
    showToast('toastBookingFail', 'error');
    return;
  }

  const booking = matching[0];

  const putData = {
    id: booking.id,
    hotel_id: state.selectedHotel.id,
    room_id: state.selectedRoom.id,
    check_in: checkIn,
    check_out: checkOut,
    total_price: totalPrice,
    status: 'pending'
  };

  await request(API.bookings, {
    method: 'PUT',
    body: JSON.stringify(putData)
  });

  const pendingObj = {
    ...booking,
    check_in: checkIn,
    check_out: checkOut,
    hotel_name: state.selectedHotel.name,
    room_number: state.selectedRoom.room_number,
    nights: nights,
    total_price: totalPrice
  };

  localStorage.setItem('grand_luxe_pending_booking', JSON.stringify(pendingObj));
  window.location.href = 'payment.html';
}

// 3. PAYMENT CONTROLLER
function initPayment() {
  const timerDisplay = document.getElementById('paymentTimer');
  if (!timerDisplay) return;

  const pendingStr = localStorage.getItem('grand_luxe_pending_booking');
  if (!pendingStr) {
    window.location.href = 'index.html';
    return;
  }

  const b = JSON.parse(pendingStr);
  state.currentPendingBooking = b;

  document.getElementById('paymentSummaryHotel').innerText = b.hotel_name;
  document.getElementById('paymentSummaryRoom').innerText = `Kamar ${b.room_number}`;
  document.getElementById('paymentSummaryCheckIn').innerText = formatDate(b.check_in);
  document.getElementById('paymentSummaryCheckOut').innerText = formatDate(b.check_out);
  document.getElementById('paymentSummaryNights').innerText = `${b.nights} ${state.currentLang === 'id' ? 'Malam' : 'Nights'}`;
  document.getElementById('paymentSummaryTotalPrice').innerText = formatRupiah(b.total_price);

  renderPaymentMethodDetails('qris');

  clearInterval(state.timerInterval);

  // Calculate remaining time dynamically based on b.created_at
  let elapsedSeconds = 0;
  if (b.created_at) {
    const createdAtStr = b.created_at.replace(' ', 'T');
    const startTime = new Date(createdAtStr);
    const now = new Date();
    elapsedSeconds = Math.floor((now - startTime) / 1000);
  }

  let timeLeft = 3600 - elapsedSeconds;
  if (timeLeft <= 0) {
    handleBookingTimeout();
    return;
  }

  state.timerInterval = setInterval(() => {
    timeLeft--;

    if (timeLeft <= 0) {
      clearInterval(state.timerInterval);
      handleBookingTimeout();
      return;
    }

    const min = Math.floor(timeLeft / 60);
    const sec = timeLeft % 60;

    timerDisplay.innerText = `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;

    if (timeLeft < 300) {
      timerDisplay.style.color = 'var(--danger)';
    }
  }, 1000);
}

function renderPaymentMethodDetails(method) {
  const area = document.getElementById('paymentDetailsArea');
  if (!area) return;

  const storedPhone = state.currentUser ? (localStorage.getItem('grand_luxe_whatsapp_' + state.currentUser.id) || '') : '';

  if (method === 'qris') {
    area.innerHTML = `
      <div class="qris-qr-code">
        <svg viewBox="0 0 100 100" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <path d="M5,5 h30 v30 h-30 z M10,10 h20 v20 h-20 z M5,65 h30 v30 h-30 z M10,70 h20 v20 h-20 z M65,5 h30 v30 h-30 z M70,10 h20 v20 h-20 z M45,15 h10 v10 h-10 z M45,45 h10 v10 h-10 z M15,45 h10 v10 h-10 z M65,45 h10 v10 h-10 z M65,65 h10 v10 h-10 z M85,85 h10 v10 h-10 z M55,75 h20 v10 h-20 z M45,65 h10 v10 h-10 z M75,55 h10 v15 h-10 z" fill="#000000"/>
          <rect x="42" y="42" width="16" height="16" fill="var(--accent-color)" />
        </svg>
      </div>
      <p class="payment-instruction" data-translate="qrisInstruction">${translations[state.currentLang].qrisInstruction}</p>
    `;
  } else if (method === 'dana' || method === 'shopeepay') {
    const wallet = method === 'dana' ? 'DANA' : 'ShopeePay';
    const label = state.currentLang === 'id' ? `Nomor HP terdaftar ${wallet}` : `Registered ${wallet} Phone Number`;
    const desc = state.currentLang === 'id' ?
      `Notifikasi penagihan pembayaran instan akan dikirim langsung ke aplikasi ${wallet} HP Anda.` :
      `Instant payment billing notification will be sent directly to your ${wallet} phone app.`;
    area.innerHTML = `
      <div class="wallet-form">
        <div class="form-group">
          <label>${label}</label>
          <input type="tel" id="walletPhone" required placeholder="08xxxxxxxxxx" value="${storedPhone}">
        </div>
        <p class="payment-instruction">${desc}</p>
      </div>
    `;
  } else if (method === 'saldogrand') {
    const balance = state.currentUser ? getVirtualBalance(state.currentUser.id) : null;
    const bookingPrice = state.currentPendingBooking ? state.currentPendingBooking.total_price : 0;
    const isInsufficient = balance === undefined || balance === null || balance < bookingPrice;

    let balanceWarning = '';
    if (isInsufficient) {
      const shortage = bookingPrice - (balance || 0);
      balanceWarning = `
        <div style="background-color: var(--danger-glow); border: 1px solid var(--danger); padding: 0.75rem; border-radius: var(--radius-sm); margin-top: 0.5rem; width: 100%;">
          <p style="color: var(--danger); font-weight: 600; font-size: 0.8rem; margin: 0;">Saldo tidak cukup! Kurang ${formatRupiah(shortage)}</p>
          <button class="btn btn-primary" onclick="processTopUpPaymentPage()" style="margin-top: 0.5rem; padding: 0.4rem 0.8rem; font-size: 0.8rem;">Top Up Sekarang</button>
        </div>
      `;
    }

    area.innerHTML = `
      <div style="text-align: center; display: flex; flex-direction: column; gap: 0.5rem; width:100%;">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width: 48px; height: 48px; color: var(--accent-gold); margin: 0 auto;">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p class="payment-instruction" style="font-weight:600;">Pembayaran dengan Saldo Grand</p>
        <p class="payment-instruction">Saldo Anda saat ini: <span style="font-weight:700; color:var(--accent-gold);" id="paymentPageBalanceVal">${balance !== null && balance !== undefined ? formatRupiah(balance) : 'Rp 0'}</span></p>
        <p class="payment-instruction">Saldo akan dipotong secara otomatis setelah konfirmasi.</p>
        ${balanceWarning}
      </div>
    `;
  } else if (method === 'cash') {
    const label = state.currentLang === 'id' ? 'Nomor HP Konfirmasi Tunai' : 'Cash Confirmation Phone Number';
    const cashTitle = state.currentLang === 'id' ? 'Bayar Tunai di Resepsionis' : 'Pay Cash at Receptionist';
    const cashDesc = state.currentLang === 'id' ?
      'Tunjukkan detail invoice pesanan ini kepada petugas resepsionis saat check-in hotel untuk menyelesaikan pembayaran tunai.' :
      'Present this booking invoice details to the receptionist during hotel check-in to complete the cash payment.';
    area.innerHTML = `
      <div class="wallet-form" style="width: 100%;">
        <div style="text-align: center; display: flex; flex-direction: column; gap: 0.5rem; width:100%; margin-bottom: 1rem;">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width: 48px; height: 48px; color: var(--accent-gold); margin: 0 auto;">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5h16.5M3.75 20.25z" />
          </svg>
          <p class="payment-instruction" style="font-weight:600;">${cashTitle}</p>
          <p class="payment-instruction">${cashDesc}</p>
        </div>
        <div class="form-group">
          <label>${label}</label>
          <input type="tel" id="walletPhone" required placeholder="08xxxxxxxxxx" value="${storedPhone}">
        </div>
      </div>
    `;
  }
}

window.processTopUpPaymentPage = function () {
  if (!state.currentUser) return;
  const msg = state.currentLang === 'id' ? 'Masukkan nominal top up (Rupiah):' : 'Enter top up amount (Rupiah):';
  const amountStr = prompt(msg, '500000');
  const amount = parseInt(amountStr) || 0;

  if (amount > 0) {
    const cur = getVirtualBalance(state.currentUser.id);
    updateVirtualBalance(state.currentUser.id, cur + amount);
    showToast('toastTopUpSuccess', 'success', formatRupiah(amount));
    renderPaymentMethodDetails('saldogrand');
  }
};

async function showReceiptModal(booking) {
  // If the modal markup doesn't exist, create it in body
  let modal = document.getElementById('receiptModal');


  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'receiptModal';
    modal.className = 'modal-overlay';
    modal.style.overflowY = 'auto';
    modal.style.padding = '2rem 1rem';
    modal.style.alignItems = 'flex-start';
    modal.innerHTML = `
      <div class="modal-window"
     style="
       max-width: 500px;
       width: 95%;
       border-radius: var(--radius-lg);
       margin: auto;
     ">
        <div class="modal-header" style="border: none; padding: 1rem 1.5rem 0.5rem; background-color: var(--bg-secondary); display: flex; justify-content: flex-end; align-items: center;">
          <button class="modal-close-btn" onclick="closeModal('receiptModal')" style="font-size: 2rem; cursor: pointer; color: var(--text-muted); background: none; border: none;">&times;</button>
        </div>
        <div class="modal-body" style="padding: 0 1.5rem 1.5rem; background-color: var(--bg-secondary);">
          <div class="receipt-card" style="box-shadow: none; border: 1px solid var(--border-color); border-radius: var(--radius-md); overflow: hidden; background-color: var(--bg-secondary);">
            <div class="receipt-header-banner" id="modalReceiptBanner" style="padding: 1.5rem; text-align: center; color: white;">
              <div class="receipt-check-circle" style="width: 48px; height: 48px; font-size: 1.5rem; border-width: 2px; margin: 0 auto 0.5rem; display: flex; align-items: center; justify-content: center; border: 2px solid white; border-radius: 50%;">✓</div>
              <h2 id="modalReceiptTitle" style="font-size: 1.5rem; margin: 0; font-family: var(--font-heading); font-weight: 700;">Pembayaran Sukses!</h2>
              <p id="modalReceiptSubtitle" style="font-size: 0.78rem; opacity: 0.95; margin: 0.25rem 0 0; line-height: 1.4;"></p>
            </div>
            
            <div class="receipt-body" style="padding: 1.25rem; display: flex; flex-direction: column; gap: 0.85rem; background-color: var(--bg-secondary);">
              <div class="receipt-row" style="display: flex; justify-content: space-between; font-size: 0.9rem;">
                <span class="label" style="color: var(--text-muted);" data-translate="invoiceNumber">Nomor Transaksi</span>
                <span class="val" id="modalReceiptInvoiceNo" style="font-family: monospace; color: white;">-</span>
              </div>
              <div class="receipt-row" style="display: flex; justify-content: space-between; font-size: 0.9rem;">
                <span class="label" style="color: var(--text-muted);" data-translate="receiptDate">Tanggal Transaksi</span>
                <span class="val" id="modalReceiptDate" style="color: white;">-</span>
              </div>
              <div class="receipt-row" style="display: flex; justify-content: space-between; font-size: 0.9rem;">
                <span class="label" style="color: var(--text-muted);" data-translate="hotel">Hotel</span>
                <span class="val" id="modalReceiptHotel" style="font-weight: 600; color: white;">-</span>
              </div>
              <div class="receipt-row" style="display: flex; justify-content: space-between; font-size: 0.9rem;">
                <span class="label" style="color: var(--text-muted);" data-translate="room">Kamar</span>
                <span class="val" id="modalReceiptRoom" style="color: white;">-</span>
              </div>
              
              <div class="receipt-divider" style="border-top: 2px dashed var(--border-color); margin: 0.5rem 0; position: relative;"></div>
              
              <div class="receipt-row" style="display: flex; justify-content: space-between; font-size: 0.9rem;">
                <span class="label" style="color: var(--text-muted);" data-translate="checkInDate">Tanggal Check-in</span>
                <span class="val" id="modalReceiptCheckIn" style="color: white;">-</span>
              </div>
              <div class="receipt-row" style="display: flex; justify-content: space-between; font-size: 0.9rem;">
                <span class="label" style="color: var(--text-muted);" data-translate="checkOutDate">Tanggal Check-out</span>
                <span class="val" id="modalReceiptCheckOut" style="color: white;">-</span>
              </div>
              <div class="receipt-row" style="display: flex; justify-content: space-between; font-size: 0.9rem;">
                <span class="label" style="color: var(--text-muted);" data-translate="paymentMethod">Metode Pembayaran</span>
                <span class="val" id="modalReceiptMethod" style="color: white;">-</span>
              </div>
              
              <div class="receipt-divider" style="border-top: 2px dashed var(--border-color); margin: 0.5rem 0; position: relative;"></div>
              
              <div class="receipt-row total" style="display: flex; justify-content: space-between; font-size: 1.2rem; font-weight: 800; color: var(--accent-gold); border-top: none; padding-top: 0;">
                <span id="modalReceiptAmountLabel" style="font-size: 0.95rem; font-weight: normal; color: var(--text-muted);">Total yang Dibayar</span>
                <span id="modalReceiptAmountPaid" style="font-weight: 800; color: var(--accent-gold); font-size: 1.2rem;">Rp 0</span>
              </div>
              
              <div id="modalReceiptActionArea" style="margin-top: 0.5rem; display: none;">
                <button class="btn btn-primary" id="modalReceiptPayBtn" style="width: 100%; padding: 0.75rem; border-radius: var(--radius-md); font-weight: 600;">Lanjut Membayar</button>
              </div>

              <div id="modalReceiptCashArea" style="margin-top: 0.5rem; display: none; text-align: center; border-top: 1px dashed var(--border-color); padding-top: 1rem;">
                
                <!-- Countdown Timer for Cash Payment -->
                <div id="modalReceiptCashCountdownArea" style="margin-bottom: 1rem; display: none;">
                  <div class="timer-box" style="background: linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(245, 158, 11, 0.05)); border: 1px solid rgba(245, 158, 11, 0.3); display: flex; align-items: center; justify-content: space-between; padding: 0.75rem 1rem; border-radius: var(--radius-md);">
                    <div class="timer-info" style="text-align: left; display: flex; flex-direction: column; gap: 0.25rem;">
                      <span class="timer-label" id="modalReceiptCashCountdownLabel" style="color: var(--accent-gold); font-size: 0.75rem; font-weight: 700; text-transform: uppercase;">Sisa Waktu Pembayaran Tunai</span>
                      <span class="timer-val" id="modalReceiptCashCountdownVal" style="font-size: 1.4rem; font-family: monospace; font-weight: 700; color: #ffffff;">-</span>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor" style="width: 28px; height: 28px; color: var(--accent-gold);">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>

                <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.5rem;">Tunjukkan QR Code ini ke Resepsionis untuk pembayaran tunai:</p>
                <div style="background: white; padding: 0.5rem; width: 120px; height: 120px; margin: 0.5rem auto; border-radius: var(--radius-sm);">
                  <svg viewBox="0 0 100 100" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5,5 h30 v30 h-30 z M10,10 h20 v20 h-20 z M5,65 h30 v30 h-30 z M10,70 h20 v20 h-20 z M65,5 h30 v30 h-30 z M70,10 h20 v20 h-20 z M45,15 h10 v10 h-10 z M45,45 h10 v10 h-10 z M15,45 h10 v10 h-10 z M65,45 h10 v10 h-10 z M65,65 h10 v10 h-10 z M85,85 h10 v10 h-10 z M55,75 h20 v10 h-20 z M45,65 h10 v10 h-10 z M75,55 h10 v15 h-10 z" fill="#000000"/>
                    <rect x="42" y="42" width="16" height="16" fill="var(--danger)" />
                  </svg>
                </div>
                <p style="font-size: 0.75rem; color: var(--danger); font-weight: 600;">(Hanya Staf Hotel yang Dapat Memindai)</p>
                <button class="btn btn-primary" id="modalReceiptCashConfirmBtn" style="width: 100%; margin-top: 0.5rem; background-color: var(--success); border-color: var(--success); padding: 0.6rem; font-size: 0.85rem;">[Staf] Scan & Konfirmasi Pembayaran</button>
                <button class="btn btn-secondary" id="modalReceiptCashCancelBtn" style="width: 100%; margin-top: 0.5rem; background-color: transparent; border-color: var(--danger); color: var(--danger); padding: 0.6rem; font-size: 0.85rem; font-weight: 600;">Batalkan Pesanan</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  // Ensure scroll styles are always applied to override cache or pre-existing overlay elements
  modal.style.overflowY = 'auto';
  modal.style.padding = '2rem 1rem';
  modal.style.alignItems = 'flex-start';

  // Fetch hotel and room
  const hotel = fallbackDb.hotels.find(h => h.id == booking.hotel_id) || { name: 'Hotel' };
  const room = fallbackDb.rooms.find(r => r.id == booking.room_id) || { room_number: '' };

  let payMethod = 'SALDO GRAND';
  let payStatus = 'paid';
  let paymentRecordId = null;
  try {
    const paymentRecords = await request(`${API.payments}?booking_id=${booking.id}`);
    if (paymentRecords && paymentRecords.length > 0) {
      payMethod = paymentRecords[0].payment_method || 'SALDO GRAND';
      payStatus = paymentRecords[0].status || 'paid';
      paymentRecordId = paymentRecords[0].id;
    } else {
      payMethod = booking.payment_method || 'SALDO GRAND';
    }
  } catch (err) {
    console.error("Failed to load payment info", err);
  }

  const today = booking.created_at ? booking.created_at.split(' ')[0] : new Date().toISOString().split('T')[0];

  document.getElementById('modalReceiptInvoiceNo').innerText = `#INV-2026-${String(booking.id).padStart(4, '0')}`;
  document.getElementById('modalReceiptDate').innerText = today;
  document.getElementById('modalReceiptHotel').innerText = hotel.name;
  document.getElementById('modalReceiptRoom').innerText = `Kamar ${room.room_number || '-'}`;
  document.getElementById('modalReceiptCheckIn').innerText = formatDate(booking.check_in);
  document.getElementById('modalReceiptCheckOut').innerText = formatDate(booking.check_out);
  document.getElementById('modalReceiptMethod').innerText = booking.status === 'pending' ? 'PENDING' : booking.status === 'cancelled' ? 'CANCELLED' : payMethod.toUpperCase();
  document.getElementById('modalReceiptAmountPaid').innerText = formatRupiah(booking.total_price);

  const banner = document.getElementById('modalReceiptBanner');
  const title = document.getElementById('modalReceiptTitle');
  const subtitle = document.getElementById('modalReceiptSubtitle');
  const amountLabel = document.getElementById('modalReceiptAmountLabel');
  const iconCircle = banner.querySelector('.receipt-check-circle');
  const actionArea = document.getElementById('modalReceiptActionArea');
  const cashArea = document.getElementById('modalReceiptCashArea');



  if (booking.status === 'pending') {
    banner.style.background = 'linear-gradient(135deg, var(--warning), #d97706)';
    iconCircle.innerText = '!';
    title.innerText = state.currentLang === 'id' ? "Pembayaran Pending!" : "Payment Pending!";
    subtitle.innerText = state.currentLang === 'id' ?
      "Selesaikan pembayaran Anda sebelum batas waktu habis." :
      "Please complete your payment before the countdown timer expires.";
    amountLabel.innerText = state.currentLang === 'id' ? "Total yang Harus Dibayar" : "Total to Pay";

    if (actionArea) {
      actionArea.style.display = 'block';
      const payBtn = document.getElementById('modalReceiptPayBtn');
      if (payBtn) {
        payBtn.innerText = state.currentLang === 'id' ? "Lanjut Membayar" : "Continue to Pay";
        payBtn.onclick = () => {
          closeModal('receiptModal');
          const nights = booking.check_out && booking.check_in ?
            Math.ceil((new Date(booking.check_out) - new Date(booking.check_in)) / (1000 * 3600 * 24)) : 1;

          const pendingObj = {
            ...booking,
            hotel_name: hotel.name,
            room_number: room.room_number,
            nights: nights || 1,
            total_price: booking.total_price
          };

          localStorage.setItem('grand_luxe_pending_booking', JSON.stringify(pendingObj));
          window.location.href = 'payment.html';
        };
      }
    }
    if (cashArea) {
      cashArea.style.display = 'none';
    }
  } else if (booking.status === 'cancelled') {
    banner.style.background = 'linear-gradient(135deg, var(--danger), #dc2626)';
    iconCircle.innerText = '×';
    title.innerText = state.currentLang === 'id' ? "Transaksi Dibatalkan!" : "Transaction Cancelled!";
    subtitle.innerText = state.currentLang === 'id' ?
      "Pemesanan kamar ini telah dibatalkan atau waktu pembayaran habis." :
      "This booking has been cancelled or the payment time limit expired.";
    amountLabel.innerText = state.currentLang === 'id' ? "Total Tagihan" : "Total Price";
    if (actionArea) actionArea.style.display = 'none';
    if (cashArea) cashArea.style.display = 'none';
  } else {
    if (payMethod.toLowerCase() === 'cash') {
      if (payStatus === 'unpaid') {
        banner.style.background = 'linear-gradient(135deg, var(--warning), var(--accent-gold))';
        iconCircle.innerText = '!';
        title.innerText = state.currentLang === 'id' ? "Pemesanan Berhasil!" : "Booking Successful!";

        const todayDate = new Date();
        const checkInDate = new Date(booking.check_in);
        const diffTime = checkInDate - todayDate;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        let deadlineText = '';
        if (diffDays > 0) {
          deadlineText = state.currentLang === 'id' ?
            `sebelum check-in pada tanggal ${formatDate(booking.check_in)} (${diffDays} hari lagi)` :
            `before check-in on ${formatDate(booking.check_in)} (${diffDays} days remaining)`;
        } else {
          deadlineText = state.currentLang === 'id' ?
            `sebelum check-in pada tanggal ${formatDate(booking.check_in)} (hari ini)` :
            `before check-in on ${formatDate(booking.check_in)} (today)`;
        }

        subtitle.innerText = state.currentLang === 'id' ?
          `Silakan tunjukkan struk ini dan lakukan pembayaran tunai ke petugas resepsionis ${deadlineText}.` :
          `Please present this receipt and make cash payment to the receptionist ${deadlineText}.`;
        amountLabel.innerText = state.currentLang === 'id' ? "Total yang Harus Dibayar" : "Total to Pay";

        if (actionArea) actionArea.style.display = 'none';
        if (cashArea) {
          cashArea.style.display = 'block';

          // Start Cash Countdown Timer!
          startCashCountdown(booking, 'modalReceiptCashCountdownVal', 'modalReceiptCashCountdownArea');

          const cashConfirmBtn = document.getElementById('modalReceiptCashConfirmBtn');
          if (cashConfirmBtn) {
            cashConfirmBtn.onclick = async () => {
              const putPayData = {
                id: paymentRecordId,
                booking_id: booking.id,
                amount: booking.total_price,
                payment_date: new Date().toISOString().split('T')[0],
                payment_method: 'CASH',
                status: 'paid'
              };
              await request(API.payments, {
                method: 'PUT',
                body: JSON.stringify(putPayData)
              });

              showToast('toastPaymentSuccess', 'success');

              if (window.location.pathname.includes('riwayat.html')) {
                initRiwayatPage();
              } else if (window.location.pathname.includes('profile.html')) {
                initStandaloneProfile();
              }

              closeModal('receiptModal');
              setTimeout(async () => {
                const freshBookings = await request(`${API.bookings}?id=${booking.id}`);
                if (freshBookings && freshBookings.length > 0) {
                  showReceiptModal(freshBookings[0]);
                } else {
                  showReceiptModal({ ...booking, status: 'confirmed' });
                }
              }, 300);
            };
          }

          const cashCancelBtn = document.getElementById('modalReceiptCashCancelBtn');
          if (cashCancelBtn) {
            cashCancelBtn.innerText = state.currentLang === 'id' ? "Batalkan Pesanan" : "Cancel Booking";
            cashCancelBtn.onclick = async () => {
              if (confirm(state.currentLang === 'id' ? "Apakah Anda yakin ingin membatalkan pesanan ini?" : "Are you sure you want to cancel this booking?")) {
                const putData = {
                  id: booking.id,
                  hotel_id: booking.hotel_id,
                  room_id: booking.room_id,
                  check_in: booking.check_in,
                  check_out: booking.check_out,
                  total_price: booking.total_price,
                  status: 'cancelled'
                };
                await request(API.bookings, {
                  method: 'PUT',
                  body: JSON.stringify(putData)
                });

                showToast('toastPaymentFailed', 'info');

                if (window.location.pathname.includes('riwayat.html')) {
                  initRiwayatPage();
                } else if (window.location.pathname.includes('profile.html')) {
                  initStandaloneProfile();
                }

                closeModal('receiptModal');
              }
            };
          }
        }
      } else {
        banner.style.background = 'linear-gradient(135deg, var(--success), #059669)';
        iconCircle.innerText = '✓';
        title.innerText = state.currentLang === 'id' ? "Pembayaran Sukses!" : "Payment Successful!";
        subtitle.innerText = state.currentLang === 'id' ?
          "Pembayaran tunai telah diterima dan dikonfirmasi oleh resepsionis." :
          "Cash payment has been received and confirmed by the receptionist.";
        amountLabel.innerText = state.currentLang === 'id' ? "Total yang Dibayar" : "Total Amount Paid";

        if (actionArea) actionArea.style.display = 'none';
        if (cashArea) cashArea.style.display = 'none';

        // Hide Cash Countdown Timer if it is paid
        const modalCashCountdownArea = document.getElementById('modalReceiptCashCountdownArea');
        if (modalCashCountdownArea) modalCashCountdownArea.style.display = 'none';
        if (cashTimerIntervals['modalReceiptCashCountdownVal']) {
          clearInterval(cashTimerIntervals['modalReceiptCashCountdownVal']);
          delete cashTimerIntervals['modalReceiptCashCountdownVal'];
        }
      }
    } else {
      banner.style.background = 'linear-gradient(135deg, var(--success), #059669)';
      iconCircle.innerText = '✓';
      title.innerText = state.currentLang === 'id' ? "Pembayaran Sukses!" : "Payment Successful!";
      subtitle.innerText = state.currentLang === 'id' ?
        "Kamar Anda telah berhasil dipesan dan dikonfirmasi." :
        "Your room has been successfully booked and confirmed.";
      amountLabel.innerText = state.currentLang === 'id' ? "Total yang Dibayar" : "Total Amount Paid";

      if (actionArea) actionArea.style.display = 'none';
      if (cashArea) cashArea.style.display = 'none';

      // Hide Cash Countdown Timer
      const modalCashCountdownArea = document.getElementById('modalReceiptCashCountdownArea');
      if (modalCashCountdownArea) modalCashCountdownArea.style.display = 'none';
      if (cashTimerIntervals['modalReceiptCashCountdownVal']) {
        clearInterval(cashTimerIntervals['modalReceiptCashCountdownVal']);
        delete cashTimerIntervals['modalReceiptCashCountdownVal'];
      }
    }
  }

  openModal('receiptModal');
}

async function confirmPayment() {
  const b = state.currentPendingBooking;
  if (!b) return;

  const activeCard = document.querySelector('.payment-method-card.selected');
  const activeMethod = activeCard ? activeCard.getAttribute('data-method') : 'qris';
  const activeMethodUpper = activeMethod.toUpperCase();
  const today = new Date().toISOString().split('T')[0];

  // Phone number verification check (only for DANA, ShopeePay, Cash)
  if (activeMethod === 'dana' || activeMethod === 'shopeepay' || activeMethod === 'cash') {
    const phoneInput = document.getElementById('walletPhone');
    const phoneNumber = phoneInput ? phoneInput.value.trim() : '';
    if (!phoneNumber) {
      alert(translations[state.currentLang].pleaseEnterPhone || "Silakan masukkan nomor handphone terlebih dahulu!");
      return;
    }
    const phoneRegex = /^[0-9+]{9,15}$/;
    if (!phoneRegex.test(phoneNumber)) {
      alert(translations[state.currentLang].invalidPhone || "Nomor handphone tidak valid!");
      return;
    }
  }

  // 1. Balance deduction check only for SALDO GRAND
  if (activeMethod === 'saldogrand') {
    if (!state.currentUser) {
      alert(state.currentLang === 'id' ? "Saldo tidak cukup!" : "Insufficient balance!");
      return;
    }
    const balance = getVirtualBalance(state.currentUser.id);
    if (balance === undefined || balance === null || balance < b.total_price) {
      alert(state.currentLang === 'id' ? "Saldo tidak cukup!" : "Insufficient balance!");
      return;
    }
    // Deduct dummy balance
    updateVirtualBalance(state.currentUser.id, balance - b.total_price);
  }

  // 2. Update booking status
  const putData = {
    id: b.id,
    hotel_id: b.hotel_id,
    room_id: b.room_id,
    check_in: b.check_in,
    check_out: b.check_out,
    total_price: b.total_price,
    status: 'confirmed'
  };

  await request(API.bookings, {
    method: 'PUT',
    body: JSON.stringify(putData)
  });

  // 3. Create payment record
  // For Cash: status is 'unpaid' because it is cash on arrival. For others, status is 'paid'.
  const paymentStatus = (activeMethod === 'cash') ? 'unpaid' : 'paid';
  const paymentMethodLabel = (activeMethod === 'saldogrand') ? 'SALDO GRAND' : activeMethodUpper;

  const payData = {
    booking_id: b.id,
    amount: b.total_price,
    payment_date: today,
    payment_method: paymentMethodLabel,
    status: paymentStatus
  };

  await request(API.payments, {
    method: 'POST',
    body: JSON.stringify(payData)
  });

  clearInterval(state.timerInterval);
  showToast('toastPaymentSuccess', 'success');

  // 4. Populate receipt details
  document.getElementById('receiptInvoiceNo').innerText = `#INV-2026-${String(b.id).padStart(4, '0')}`;
  document.getElementById('receiptDate').innerText = today;
  document.getElementById('receiptHotel').innerText = b.hotel_name;
  document.getElementById('receiptRoom').innerText = `Kamar ${b.room_number}`;
  document.getElementById('receiptCheckIn').innerText = formatDate(b.check_in);
  document.getElementById('receiptCheckOut').innerText = formatDate(b.check_out);
  document.getElementById('receiptMethod').innerText = paymentMethodLabel;
  document.getElementById('receiptAmountPaid').innerText = formatRupiah(b.total_price);

  // 5. Update Receipt Title & Subtitle UI dynamically based on payment method
  const receiptTitle = document.querySelector('#receiptSection h2');
  const receiptSubtitle = document.querySelector('#receiptSection p');
  const amountLabel = document.querySelector('#receiptSection .receipt-row.total span:first-child');

  if (activeMethod === 'cash') {
    const todayDate = new Date();
    const checkInDate = new Date(b.check_in);
    const diffTime = checkInDate - todayDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    let deadlineText = '';
    if (diffDays > 0) {
      deadlineText = state.currentLang === 'id' ?
        `sebelum check-in pada tanggal ${formatDate(b.check_in)} (${diffDays} hari lagi)` :
        `before check-in on ${formatDate(b.check_in)} (${diffDays} days remaining)`;
    } else {
      deadlineText = state.currentLang === 'id' ?
        `sebelum check-in pada tanggal ${formatDate(b.check_in)} (hari ini)` :
        `before check-in on ${formatDate(b.check_in)} (today)`;
    }

    receiptTitle.innerText = state.currentLang === 'id' ? "Pemesanan Berhasil!" : "Booking Successful!";
    receiptSubtitle.innerText = state.currentLang === 'id' ?
      `Silakan tunjukkan struk ini dan lakukan pembayaran tunai ke petugas resepsionis ${deadlineText}.` :
      `Please present this receipt and make cash payment to the receptionist ${deadlineText}.`;

    if (amountLabel) {
      amountLabel.innerText = translations[state.currentLang].amountToPay || "Total yang Harus Dibayar";
    }

    const receiptCashArea = document.getElementById('receiptCashArea');
    if (receiptCashArea) receiptCashArea.style.display = 'block';

    // Start Cash Countdown Timer!
    startCashCountdown(b, 'receiptCashCountdownVal', 'receiptCashCountdownArea');

    const receiptCashCancelBtn = document.getElementById('receiptCashCancelBtn');
    if (receiptCashCancelBtn) {
      receiptCashCancelBtn.innerText = state.currentLang === 'id' ? "Batalkan Pesanan" : "Cancel Booking";
      receiptCashCancelBtn.onclick = async () => {
        if (confirm(state.currentLang === 'id' ? "Apakah Anda yakin ingin membatalkan pesanan ini?" : "Are you sure you want to cancel this booking?")) {
          const putData = {
            id: b.id,
            hotel_id: b.hotel_id,
            room_id: b.room_id,
            check_in: b.check_in,
            check_out: b.check_out,
            total_price: b.total_price,
            status: 'cancelled'
          };
          await request(API.bookings, {
            method: 'PUT',
            body: JSON.stringify(putData)
          });
          showToast('toastPaymentFailed', 'info');
          setTimeout(() => {
            window.location.href = 'index.html';
          }, 1000);
        }
      };
    }
  } else {
    receiptTitle.innerText = translations[state.currentLang].receiptSuccess || "Pembayaran Sukses!";
    receiptSubtitle.innerText = translations[state.currentLang].receiptOrderSuccess || "Kamar Anda telah berhasil dipesan dan dikonfirmasi.";
    if (amountLabel) {
      amountLabel.innerText = translations[state.currentLang].amountPaid || "Total yang Dibayar";
    }
    const receiptCashArea = document.getElementById('receiptCashArea');
    if (receiptCashArea) receiptCashArea.style.display = 'none';

    // Hide Cash Countdown Timer
    const receiptCashCountdownArea = document.getElementById('receiptCashCountdownArea');
    if (receiptCashCountdownArea) receiptCashCountdownArea.style.display = 'none';
    if (cashTimerIntervals['receiptCashCountdownVal']) {
      clearInterval(cashTimerIntervals['receiptCashCountdownVal']);
      delete cashTimerIntervals['receiptCashCountdownVal'];
    }
  }

  document.getElementById('paymentActiveSection').style.display = 'none';
  document.getElementById('receiptSection').style.display = 'block';

  localStorage.removeItem('grand_luxe_pending_booking');
}

async function handleBookingTimeout() {
  const b = state.currentPendingBooking;
  if (!b) return;

  const putData = {
    id: b.id,
    hotel_id: b.hotel_id,
    room_id: b.room_id,
    check_in: b.check_in,
    check_out: b.check_out,
    total_price: b.total_price,
    status: 'cancelled'
  };

  await request(API.bookings, {
    method: 'PUT',
    body: JSON.stringify(putData)
  });

  clearInterval(state.timerInterval);
  localStorage.removeItem('grand_luxe_pending_booking');
  alert(translations[state.currentLang].toastTimeout);
  window.location.href = 'index.html';
}

async function cancelBookingPayment() {
  const b = state.currentPendingBooking;
  if (!b) return;

  const putData = {
    id: b.id,
    hotel_id: b.hotel_id,
    room_id: b.room_id,
    check_in: b.check_in,
    check_out: b.check_out,
    total_price: b.total_price,
    status: 'cancelled'
  };

  await request(API.bookings, {
    method: 'PUT',
    body: JSON.stringify(putData)
  });

  clearInterval(state.timerInterval);
  localStorage.removeItem('grand_luxe_pending_booking');
  showToast('toastPaymentFailed', 'info');

  setTimeout(() => {
    window.location.href = 'index.html';
  }, 1000);
}

// ----------------------------------------------------
// STANDALONE PROFILE CONTROLLER (MATCHING SCREENSHOT)
// ----------------------------------------------------
async function initStandaloneProfile() {
  const avatarCircle = document.getElementById('avatarCircle');
  if (!avatarCircle) return; // Only execute on profile.html

  if (!state.currentUser) {
    alert("Silakan login terlebih dahulu untuk mengakses menu profil.");
    window.location.href = 'index.html';
    return;
  }

  // Set user profile visuals
  const name = state.currentUser.name;
  document.getElementById('userNameLabel').innerText = `Hai, ${name}`;

  // Initials (CO, BU etc)
  const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  avatarCircle.innerText = initials;

  // Whatsapp setup
  const storedPhone = localStorage.getItem(`grand_luxe_whatsapp_${state.currentUser.id}`) || '081287062717';
  document.getElementById('phoneLabel').innerText = storedPhone;
  document.getElementById('whatsappInput').value = storedPhone;

  // Username value (Readonly)
  document.getElementById('usernameInput').value = name;

  // Live website notification triggers
  const notifStatusVal = document.getElementById('notifStatusVal');
  const btnOff = document.getElementById('btnNotifOff');
  const btnOn = document.getElementById('btnNotifOn');

  const currentNotifState = localStorage.getItem(`grand_luxe_notif_${state.currentUser.id}`) || 'On';
  setNotificationUI(currentNotifState);

  btnOff.addEventListener('click', () => {
    localStorage.setItem(`grand_luxe_notif_${state.currentUser.id}`, 'Off');
    setNotificationUI('Off');
  });

  btnOn.addEventListener('click', () => {
    localStorage.setItem(`grand_luxe_notif_${state.currentUser.id}`, 'On');
    setNotificationUI('On');
  });

  function setNotificationUI(notifState) {
    notifStatusVal.innerText = notifState;
    if (notifState === 'On') {
      notifStatusVal.style.color = '#10b981';
      btnOn.className = 'btn-toggle-notif active-red';
      btnOff.className = 'btn-toggle-notif inactive-dark';
    } else {
      notifStatusVal.style.color = '#ef4444';
      btnOn.className = 'btn-toggle-notif inactive-dark';
      btnOff.className = 'btn-toggle-notif active-red';
    }
  }

  // Balance bindings
  const balance = getVirtualBalance(state.currentUser.id);
  document.getElementById('profileBalance').innerText = formatRupiah(balance);

  document.getElementById('refreshBalanceBtn').addEventListener('click', () => {
    const updatedBal = getVirtualBalance(state.currentUser.id);
    document.getElementById('profileBalance').innerText = formatRupiah(updatedBal);
    showToast('Saldo diperbarui!', 'success');
  });

  // Load statistical values and list history
  await loadProfileStats();

  // Whatsapp Form Save
  document.getElementById('updateWhatsappForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const phone = document.getElementById('whatsappInput').value;
    localStorage.setItem(`grand_luxe_whatsapp_${state.currentUser.id}`, phone);
    document.getElementById('phoneLabel').innerText = phone;
    showToast('toastProfileUpdateSuccess', 'success');
  });

  document.getElementById('btnCancelWhatsapp').addEventListener('click', () => {
    const activePhone = localStorage.getItem(`grand_luxe_whatsapp_${state.currentUser.id}`) || '081287062717';
    document.getElementById('whatsappInput').value = activePhone;
  });

  // Change password Form
  document.getElementById('changePasswordProfileForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const oldPassword = document.getElementById('oldPasswordInput').value;
    const newPassword = document.getElementById('newPasswordInput').value;
    const repeatPassword = document.getElementById('repeatNewPasswordInput').value;

    if (newPassword !== repeatPassword) {
      alert(state.currentLang === 'id' ? "Konfirmasi password baru tidak cocok!" : "New password confirmations do not match!");
      return;
    }

    if (state.currentUser.plainPassword && oldPassword !== state.currentUser.plainPassword) {
      showToast('toastProfileUpdateFail', 'error');
      return;
    }

    const putData = {
      id: state.currentUser.id,
      name: state.currentUser.name,
      email: state.currentUser.email,
      password: newPassword
    };

    const res = await request(API.users, {
      method: 'PUT',
      body: JSON.stringify(putData)
    });

    if (res.error || (res.message && (res.message.includes("Gagal") || res.message.includes("duplikat")))) {
      showToast('toastSignUpFail', 'error');
    } else {
      showToast('toastProfileUpdateSuccess', 'success');
      state.currentUser.plainPassword = newPassword;
      localStorage.setItem('grand_luxe_user', JSON.stringify(state.currentUser));

      document.getElementById('oldPasswordInput').value = '';
      document.getElementById('newPasswordInput').value = '';
      document.getElementById('repeatNewPasswordInput').value = '';
    }
  });

  document.getElementById('btnCancelPassword').addEventListener('click', () => {
    document.getElementById('oldPasswordInput').value = '';
    document.getElementById('newPasswordInput').value = '';
    document.getElementById('repeatNewPasswordInput').value = '';
  });

  // Sidebar links
  document.getElementById('menuTopup').addEventListener('click', (e) => { e.preventDefault(); processTopUp(); });
  document.getElementById('menuLogout').addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('grand_luxe_user');
    localStorage.removeItem('grand_luxe_token');
    state.currentUser = null;
    state.token = null;
    showToast('Keluar berhasil', 'info');
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 500);
  });

  document.getElementById('menuPoints').addEventListener('click', (e) => {
    e.preventDefault();
    const totalSpend = parseFloat(document.getElementById('profileTotalSpend').innerText.replace(/[^0-9]/g, '')) || 0;
    const points = Math.floor(totalSpend / 10000);
    const pointMsg = state.currentLang === 'id' ?
      `Poin Noami Anda: ${points} Poin.\n(Kumpulkan 1 Poin untuk setiap kelipatan Rp 10.000 belanja sukses).` :
      `Your Noami Points: ${points} Points.\n(Earn 1 Point for every Rp 10.000 of successful spending).`;
    alert(pointMsg);
  });
}

// ----------------------------------------------------
// RIWAYAT PAGE CONTROLLER
// ----------------------------------------------------
async function initRiwayatPage() {
  const tableBody = document.getElementById('transactionTableBody');
  if (!tableBody) return; // Only execute on riwayat.html

  if (!state.currentUser) {
    alert("Silakan login terlebih dahulu untuk mengakses menu riwayat.");
    window.location.href = 'index.html';
    return;
  }

  // Sidebar links
  document.getElementById('menuTopup').addEventListener('click', (e) => {
    e.preventDefault();
    processTopUp();
  });
  document.getElementById('menuLogout').addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('grand_luxe_user');
    localStorage.removeItem('grand_luxe_token');
    state.currentUser = null;
    state.token = null;
    showToast('Keluar berhasil', 'info');
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 500);
  });

  document.getElementById('menuPoints').addEventListener('click', async (e) => {
    e.preventDefault();
    try {
      const rawBookings = await request(`${API.bookings}?user_id=${state.currentUser.id}`);
      const successOrders = rawBookings.filter(b => b.status === 'confirmed');
      const totalSpend = successOrders.reduce((sum, b) => sum + parseFloat(b.total_price), 0);
      const points = Math.floor(totalSpend / 10000);
      const pointMsg = state.currentLang === 'id' ?
        `Poin Noami Anda: ${points} Poin.\n(Kumpulkan 1 Poin untuk setiap kelipatan Rp 10.000 belanja sukses).` :
        `Your Noami Points: ${points} Points.\n(Earn 1 Point for every Rp 10.000 of successful spending).`;
      alert(pointMsg);
    } catch (err) {
      console.error(err);
    }
  });

  // Load and render bookings in the table
  try {
    const bookingsList = await request(`${API.bookings}?user_id=${state.currentUser.id}`);
    renderRiwayatTable(bookingsList);
  } catch (err) {
    console.error("Failed to load bookings on riwayat page", err);
  }

  // Bind Search Button and Enter key
  const searchBtn = document.getElementById('searchBtn');
  const searchInput = document.getElementById('searchInput');

  if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', () => {
      filterRiwayatTable();
    });

    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        filterRiwayatTable();
      }
    });
  }
}

function renderRiwayatTable(bookings) {
  const tableBody = document.getElementById('transactionTableBody');
  if (!tableBody) return;
  tableBody.innerHTML = '';

  if (bookings.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:var(--text-muted); padding:2rem 0;">${translations[state.currentLang].noTransactions}</td></tr>`;
    return;
  }

  bookings.sort((a, b) => b.id - a.id);

  bookings.forEach(booking => {
    const hotel = fallbackDb.hotels.find(h => h.id == booking.hotel_id) || { name: 'Hotel' };
    const room = fallbackDb.rooms.find(r => r.id == booking.room_id) || { room_number: '' };

    const tr = document.createElement('tr');

    // Generate deterministic unique code matching the format
    const txCode = generateTxCode(booking);
    const productName = `1x ${hotel.name} - Kamar ${room.room_number || '-'}`;
    const playerId = 'default';
    const priceStr = formatRupiah(booking.total_price);

    let statusText = booking.status;
    let statusColor = '#ffffff';
    if (booking.status === 'confirmed') {
      statusText = 'Booked';
      statusColor = 'var(--success)';
    } else if (booking.status === 'pending') {
      statusText = 'Pending';
      statusColor = 'var(--warning)';
    } else if (booking.status === 'cancelled') {
      statusText = 'Cancelled';
      statusColor = 'var(--danger)';
    }

    tr.style.cursor = 'pointer';
    tr.addEventListener('click', () => {
      showReceiptModal(booking);
    });

    tr.innerHTML = `
      <td style="padding: 1rem 0.75rem; font-family: monospace;">${txCode}</td>
      <td style="padding: 1rem 0.75rem;">${productName}</td>
      <td style="padding: 1rem 0.75rem;">${playerId}</td>
      <td style="padding: 1rem 0.75rem; font-weight:700; color:var(--accent-gold);">${priceStr}</td>
      <td style="padding: 1rem 0.75rem; font-weight:700; color:${statusColor};">${statusText}</td>
    `;
    tableBody.appendChild(tr);
  });
}

function generateTxCode(booking) {
  let dateStr = '20260619000000';
  if (booking.created_at) {
    dateStr = booking.created_at.replace(/[^0-9]/g, '');
  } else if (booking.check_in) {
    dateStr = booking.check_in.replace(/[^0-9]/g, '') + '000000';
  }
  // Deterministic salt based on booking id
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let salt = '';
  let seed = parseInt(booking.id) || 1;
  for (let i = 0; i < 11; i++) {
    seed = (seed * 9301 + 49297) % 233280;
    salt += chars[seed % chars.length];
  }
  return `NOA${dateStr}${salt}`;
}

function filterRiwayatTable() {
  const query = document.getElementById('searchInput').value.toLowerCase().trim();
  const rows = document.querySelectorAll('#transactionTableBody tr');
  rows.forEach(row => {
    const text = row.innerText.toLowerCase();
    if (text.includes(query)) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
}

// ----------------------------------------------------
// PROFILE & GENERAL STATS CONTROLLERS (SHARED)
// ----------------------------------------------------
async function loadProfileStats() {
  if (!state.currentUser) return;

  try {
    const rawBookings = await request(`${API.bookings}?user_id=${state.currentUser.id}`);

    const totalOrders = rawBookings.length;
    const pendingOrders = rawBookings.filter(b => b.status === 'pending');
    const pendingCount = pendingOrders.length;
    const successOrders = rawBookings.filter(b => b.status === 'confirmed');
    const successCount = successOrders.length;

    const totalUnpaidAmount = pendingOrders.reduce((sum, b) => sum + parseFloat(b.total_price), 0);
    const totalSpend = successOrders.reduce((sum, b) => sum + parseFloat(b.total_price), 0);

    const totalEl = document.getElementById('statTotal');
    if (totalEl) totalEl.innerText = totalOrders;

    const unpaidEl = document.getElementById('statUnpaid');
    if (unpaidEl) {
      unpaidEl.innerText = pendingCount;
      unpaidEl.title = `Total: ${formatRupiah(totalUnpaidAmount)}`;
    }

    const pendingEl = document.getElementById('statPending');
    if (pendingEl) pendingEl.innerText = pendingCount;

    const successEl = document.getElementById('statSuccess');
    if (successEl) successEl.innerText = successCount;

    const spendEl = document.getElementById('profileTotalSpend');
    if (spendEl) spendEl.innerText = formatRupiah(totalSpend);

    renderBookingHistory(rawBookings);
  } catch (err) {
    console.error("Profile stats load failed", err);
  }
}

function renderBookingHistory(historyList) {
  const container = document.getElementById('profileBookingsList');
  if (!container) return;
  container.innerHTML = '';

  if (historyList.length === 0) {
    container.innerHTML = `<p style="font-size:0.85rem; color:var(--text-muted); text-align:center; padding:1rem 0;" data-translate="noTransactions">${translations[state.currentLang].noTransactions}</p>`;
    return;
  }

  historyList.sort((a, b) => b.id - a.id);

  historyList.forEach(booking => {
    const hotel = fallbackDb.hotels.find(h => h.id == booking.hotel_id) || { name: 'Hotel' };
    const room = fallbackDb.rooms.find(r => r.id == booking.room_id) || { room_number: '' };

    const item = document.createElement('div');
    item.className = 'booking-history-item';
    item.style.cursor = 'pointer';
    item.addEventListener('click', (e) => {
      if (e.target.closest('.history-actions')) return;
      showReceiptModal(booking);
    });

    let statusText = booking.status;
    if (booking.status === 'pending') statusText = translations[state.currentLang].pending;
    else if (booking.status === 'confirmed') statusText = 'Booked';
    else if (booking.status === 'cancelled') statusText = translations[state.currentLang].cancelled;

    item.innerHTML = `
      <div class="history-item-header">
        <span class="history-hotel-name">${hotel.name}</span>
        <span class="status-badge ${booking.status}">${statusText}</span>
      </div>
      <div class="history-item-details">
        <span>Kamar ${room.room_number || '-'} | ${formatDate(booking.check_in)}</span>
        <span style="font-weight:700; color:var(--accent-gold);">${formatRupiah(booking.total_price)}</span>
      </div>
    `;

    if (booking.status === 'pending') {
      const actions = document.createElement('div');
      actions.className = 'history-actions';
      actions.innerHTML = `
        <button class="btn btn-outline" style="font-size:0.72rem; padding:0.3rem 0.6rem;" data-action="pay">Bayar</button>
        <button class="btn btn-text" style="font-size:0.72rem; padding:0.3rem 0.6rem; color:var(--danger);" data-action="cancel">Batal</button>
      `;

      actions.querySelector('[data-action="pay"]').addEventListener('click', () => {
        const nights = booking.check_out && booking.check_in ?
          Math.ceil((new Date(booking.check_out) - new Date(booking.check_in)) / (1000 * 3600 * 24)) : 1;

        const pendingObj = {
          ...booking,
          hotel_name: hotel.name,
          room_number: room.room_number,
          nights: nights || 1,
          total_price: booking.total_price
        };

        localStorage.setItem('grand_luxe_pending_booking', JSON.stringify(pendingObj));
        window.location.href = 'payment.html';
      });

      actions.querySelector('[data-action="cancel"]').addEventListener('click', async () => {
        if (confirm("Batalkan pemesanan ini?")) {
          const putData = {
            id: booking.id,
            hotel_id: booking.hotel_id,
            room_id: booking.room_id,
            check_in: booking.check_in,
            check_out: booking.check_out,
            total_price: booking.total_price,
            status: 'cancelled'
          };

          await request(API.bookings, {
            method: 'PUT',
            body: JSON.stringify(putData)
          });

          showToast('toastPaymentFailed', 'info');
          loadProfileStats();
        }
      });

      item.appendChild(actions);
    }
    container.appendChild(item);
  });
}

function processTopUp() {
  if (!state.currentUser) return;

  const msg = state.currentLang === 'id' ? 'Masukkan nominal top up (Rupiah):' : 'Enter top up amount (Rupiah):';
  const amountStr = prompt(msg, '500000');
  const amount = parseInt(amountStr) || 0;

  if (amount > 0) {
    const cur = getVirtualBalance(state.currentUser.id);
    updateVirtualBalance(state.currentUser.id, cur + amount);
    showToast('toastTopUpSuccess', 'success', formatRupiah(amount));

    // Refresh elements if on profile.html
    const profileBalance = document.getElementById('profileBalance');
    if (profileBalance) {
      profileBalance.innerText = formatRupiah(cur + amount);
    }
  }
}

// ----------------------------------------------------
// Global Event Binding
// ----------------------------------------------------
document.addEventListener('DOMContentLoaded', async () => {
  initUserSession();

  // Set default translations
  updatePageLanguage();

  // 1. Bind global logo nav link
  document.getElementById('navLogo').addEventListener('click', () => {
    window.location.href = 'index.html';
  });

  // 2. Bind language switches
  document.getElementById('langToggle').addEventListener('click', () => {
    state.currentLang = state.currentLang === 'id' ? 'en' : 'id';
    localStorage.setItem('grand_luxe_lang', state.currentLang);
    updatePageLanguage();

    // Refresh page details dynamically
    if (window.location.pathname.includes('hotel_detail.html')) {
      initHotelDetail();
    } else if (window.location.pathname.includes('payment.html')) {
      initPayment();
    } else if (window.location.pathname.includes('profile.html')) {
      initStandaloneProfile();
    } else if (window.location.pathname.includes('riwayat.html')) {
      initRiwayatPage();
    } else {
      initDashboard();
    }
  });

  // 3. Bind close auth triggers
  const closeAuthBtn = document.getElementById('closeAuthModalBtn');
  if (closeAuthBtn) {
    closeAuthBtn.addEventListener('click', () => closeModal('authModal'));
  }

  const refreshCapBtn = document.getElementById('refreshCaptcha');
  if (refreshCapBtn) {
    refreshCapBtn.addEventListener('click', generateCaptcha);
  }

  const switchToLogin = document.getElementById('switchToLoginBtn');
  if (switchToLogin) {
    switchToLogin.addEventListener('click', (e) => { e.preventDefault(); showAuthForm('login'); });
  }

  const switchToSignUp = document.getElementById('switchToSignUpBtn');
  if (switchToSignUp) {
    switchToSignUp.addEventListener('click', (e) => { e.preventDefault(); showAuthForm('signUp'); });
  }

  // SignUp Form Submit
  const signupForm = document.getElementById('signUpForm');
  if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const ans = parseInt(document.getElementById('captchaAnswer').value) || 0;
      if (ans !== state.captchaValue) {
        const stat = document.getElementById('captchaStatus');
        stat.innerText = translations[state.currentLang].toastCaptchaFail;
        stat.style.color = 'var(--danger)';
        showToast('toastCaptchaFail', 'error');
        generateCaptcha();
        return;
      }

      const name = document.getElementById('signUpName').value;
      const email = document.getElementById('signUpEmail').value;
      const password = document.getElementById('signUpPassword').value;

      const res = await request(API.users, {
        method: 'POST',
        body: JSON.stringify({ name, email, password })
      });

      if (res.error || (res.message && res.message.includes("Ada duplikasi"))) {
        showToast('toastSignUpFail', 'error');
      } else {
        showToast('toastSignUpSuccess', 'success');
        showAuthForm('login');
        const loginMail = document.getElementById('loginEmail');
        if (loginMail) loginMail.value = email;
      }
    });
  }

  // Login Form Submit
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value;
      const password = document.getElementById('loginPassword').value;

      const res = await request(API.login, {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });

      if (res.error || !res.token || (res.message && res.message.includes("tidak ditemukan"))) {
        showToast('toastLoginFail', 'error');
      } else {
        state.token = res.token;
        state.currentUser = res.result;
        state.currentUser.plainPassword = password;

        localStorage.setItem('grand_luxe_user', JSON.stringify(state.currentUser));
        localStorage.setItem('grand_luxe_token', state.token);

        closeModal('authModal');
        renderUserNav();
        showToast('toastLoginSuccess', 'success', state.currentUser.name);

        if (window.location.pathname.includes('hotel_detail.html')) {
          initHotelDetail();
        } else if (window.location.pathname.includes('payment.html')) {
          initPayment();
        } else if (window.location.pathname.includes('profile.html')) {
          initStandaloneProfile();
        } else if (window.location.pathname.includes('riwayat.html')) {
          initRiwayatPage();
        } else {
          initDashboard();
        }
      }
    });
  }

  // ----------------------------------------------------
  // Page Specific Router Handlers
  // ----------------------------------------------------
  if (window.location.pathname.includes('hotel_detail.html')) {
    await initHotelDetail();

    document.getElementById('backToDashboardBtn').addEventListener('click', () => {
      window.location.href = 'index.html';
    });

    document.getElementById('checkInInput').addEventListener('change', updateCheckoutDate);
    document.getElementById('nightsInput').addEventListener('input', updateCheckoutDate);

    document.getElementById('cancelBookingBtn').addEventListener('click', () => {
      state.selectedRoom = null;
      document.querySelectorAll('.room-type-card').forEach(c => c.classList.remove('selected'));
      document.getElementById('bookingSelectedRoom').value = translations[state.currentLang].selectRoomType;
      document.getElementById('nightsInput').value = 1;
      updateCheckoutDate();
      showToast('Pemesanan dibatalkan', 'info');
    });

    document.getElementById('bookNowBtn').addEventListener('click', startBookingFlow);

  } else if (window.location.pathname.includes('payment.html')) {
    initPayment();

    document.querySelectorAll('.payment-method-card').forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll('.payment-method-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');

        const method = card.getAttribute('data-method');
        renderPaymentMethodDetails(method);

        if (method === 'saldogrand') {
          const b = state.currentPendingBooking;
          if (b) {
            const balance = state.currentUser ? getVirtualBalance(state.currentUser.id) : null;
            if (balance === undefined || balance === null || balance < b.total_price) {
              alert(state.currentLang === 'id' ? "Saldo tidak cukup!" : "Insufficient balance!");
            }
          }
        }
      });
    });

    document.getElementById('confirmPaymentBtn').addEventListener('click', confirmPayment);
    document.getElementById('cancelPaymentBtn').addEventListener('click', cancelBookingPayment);

    document.getElementById('simImmediateTimeoutBtn').addEventListener('click', () => {
      clearInterval(state.timerInterval);
      handleBookingTimeout();
    });

    document.getElementById('simFailPaymentBtn').addEventListener('click', () => {
      clearInterval(state.timerInterval);
      cancelBookingPayment();
    });

    document.getElementById('receiptBackBtn').addEventListener('click', () => {
      window.location.href = 'index.html';
    });

    document.getElementById('receiptHistoryBtn').addEventListener('click', () => {
      window.location.href = 'riwayat.html';
    });

  } else if (window.location.pathname.includes('profile.html')) {
    // STANDALONE PROFILE PAGE INITIALIZERS
    await initStandaloneProfile();

  } else if (window.location.pathname.includes('riwayat.html')) {
    // RIWAYAT PAGE INITIALIZERS
    await initRiwayatPage();

  } else {
    // HOMEPAGE DASHBOARD INITIALIZERS
    await initDashboard();

    const searchBtn = document.getElementById('searchBtn');
    if (searchBtn) searchBtn.addEventListener('click', runFiltration);

    const headSearch = document.getElementById('headerSearchInput');
    if (headSearch) headSearch.addEventListener('input', runFiltration);

    const dashSearch = document.getElementById('dashboardSearchInput');
    if (dashSearch) dashSearch.addEventListener('input', runFiltration);

    const locFilter = document.getElementById('locationFilter');
    if (locFilter) locFilter.addEventListener('change', runFiltration);

    function runFiltration() {
      const q = (headSearch.value || dashSearch.value).toLowerCase().trim();
      const loc = locFilter.value;

      let filtered = state.hotels;
      if (q) {
        filtered = filtered.filter(h =>
          h.name.toLowerCase().includes(q) ||
          h.location.toLowerCase().includes(q) ||
          h.description.toLowerCase().includes(q)
        );
      }
      if (loc) {
        filtered = filtered.filter(h => h.location === loc);
      }
      renderHotelGrid(filtered);
    }
  }
});
