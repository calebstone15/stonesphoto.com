(function() {
    const STORAGE_KEY = 'sp_analytics_events';
    const MAX_EVENTS = 10000;
    const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

    function uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    let visitorId = localStorage.getItem('sp_visitor_id');
    if (!visitorId) {
        visitorId = uuidv4();
        localStorage.setItem('sp_visitor_id', visitorId);
    }

    let sessionStr = sessionStorage.getItem('sp_session');
    let session = sessionStr ? JSON.parse(sessionStr) : null;
    const now = Date.now();

    if (!session || (now - session.lastActivity > SESSION_TIMEOUT)) {
        session = {
            id: uuidv4(),
            startTime: now,
            pagesViewed: 0
        };
    }
    session.lastActivity = now;
    session.pagesViewed += 1;
    sessionStorage.setItem('sp_session', JSON.stringify(session));

    function getDeviceType() {
        const ua = navigator.userAgent;
        if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) return "tablet";
        if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) return "mobile";
        return "desktop";
    }

    const event = {
        timestamp: now,
        url: window.location.pathname || "/",
        fullUrl: window.location.href,
        referrer: document.referrer || "Direct",
        visitorId: visitorId,
        sessionId: session.id,
        sessionStart: session.startTime,
        pagesViewedInSession: session.pagesViewed,
        resolution: `${window.screen.width}x${window.screen.height}`,
        device: getDeviceType(),
        userAgent: navigator.userAgent
    };

    try {
        let events = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        events.push(event);
        if (events.length > MAX_EVENTS) {
            events = events.slice(events.length - MAX_EVENTS);
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    } catch (e) {
        console.error("Analytics storage error", e);
    }
})();
