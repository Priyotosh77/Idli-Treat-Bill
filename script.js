let order = [];
let billNumber = 1;

function addToOrder(itemName, itemPrice) {
    order.push({ name: itemName, price: itemPrice });
    displayOrder();
}

function displayOrder() {
    const billDetails = document.getElementById("bill-details");
    let orderHTML = "";
    let total = 0;

    order.forEach((item, index) => {
        orderHTML += `<p>${index + 1}. ${item.name} - ₹${item.price}</p>`;
        total += item.price;
    });

    const tax = total * 0.05; // 5% GST
    const totalWithTax = total + tax;

    billDetails.innerHTML = orderHTML;
    document.getElementById("total-amount").textContent = totalWithTax.toFixed(2);
}

function generateBill() {
    const guestContact = document.getElementById("guest-contact").value;
    if (!guestContact || guestContact.length !== 10 || isNaN(guestContact)) {
        alert("Please enter a valid 10-digit contact number.");
        return;
    }

    const billDetails = document.getElementById("bill-details").innerHTML;
    const total = document.getElementById("total-amount").textContent;
    const gst = "5%";
    const billText = `
        IDLI TREAT
        Address: Madhyamgram, Kolkata
        Mobile: 9330350936
        GST: ***************
        ----------------------------
        ${billDetails}
        ----------------------------
        Total (including GST): ₹${total}
        GST Rate: ${gst}
        Bill No: ${billNumber}
    `;

    alert(`Bill Generated!\n${billText}`);
    sendToSMS(guestContact, billText);
    billNumber++;  // Increment Bill Number for next bill

    // Prompt for a new bill after generating the current one
    const generateNew = confirm("Do you want to generate a new bill?");
    if (generateNew) {
        resetBill();
    }
}

function sendToSMS(guestContact, billText) {
    // Construct the SMS link to send via mobile
    const encodedText = encodeURIComponent(billText);
    const smsURL = `sms:+91${guestContact}?body=${encodedText}`;
    
    const smsLink = document.getElementById("sms-link");
    smsLink.href = smsURL;
    smsLink.click();
}

function resetBill() {
    // Reset the order and total for a new bill
    order = [];
    document.getElementById("bill-details").innerHTML = "";
    document.getElementById("total-amount").textContent = "0";
    document.getElementById("guest-contact").value = "";
}
