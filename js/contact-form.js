 document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("Name").value;
    const message = document.getElementById("RequestInfo").value;

    // Replace these with your real keys
    const pushoverToken = "afg4k1tdzwi3p2g8t4kkcv1o2robhz";
    const pushoverUser = "uvcqxq3ih58uvnd8ikxj4aq9fzmrb8";

    fetch("https://api.pushover.net/1/messages.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        token: pushoverToken,
        user: pushoverUser,
        title: "New Contact Form Submission",
        message: `From: ${name}\n\n${message}`,
        priority: 1 // 0 = normal, 1 = high, 2 = emergency
        // Optional for emergency:
        // sound: "siren", // pick from https://pushover.net/api#sounds
        // retry: 30,
        // expire: 600
      })
    })
    .then(response => {
      if (response.ok) {
        alert("Message sent!");
      } else {
        alert("Error sending notification.");
      }
    })
    .catch(err => {
      alert("Network error.");
      console.error(err);
    });
  });