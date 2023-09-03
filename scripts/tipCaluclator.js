class TipCalculator {
  constructor() {
    this.billAmountInput = document.getElementById("billAmount");
    this.serviceQuality = document.getElementById("serviceQuality");
    this.calculateButton = document.getElementById("calculateTip");
    this.resetButton = document.getElementById("resetForm");
    this.tipAMountElement = document.getElementById("tipAmount");
    this.totalBillElement = document.getElementById("totalBill");
    this.errorPopup = document.getElementById("errorPopup");
    this.errorMessage = document.getElementById("errorMessage");

    //Attach event listeners
    this.calculateButton.addEventListener(
      "click",
      this.calculateTip.bind(this)
    );
    this.resetButton.addEventListener("click", this.resetForm.bind(this));
    // Attach event listener to hide the error pop-up on click
    this.errorPopup.addEventListener("click", this.hideError.bind(this));
  }

  // Function to calculate the tip and update the UI
  calculateTip() {
    // Get bill amount and service quality
    const billAmount = parseFloat(this.billAmountInput.value);
    const serviceQuality = this.serviceQuality.value;

    try {
        // Check if bill amount is a positive number
      this.validateBillAmount(billAmount);
      this.validateServiceQuality(serviceQuality);

      let tipPercentage = 0;

      switch (serviceQuality) {
        case "excellent":
          tipPercentage = 0.2;
          break;
        case "good":
          tipPercentage = 0.15;
          break;
        case "poor":
          tipPercentage = 0.1;
          break;
        default:
          throw new Error("Please select a service quality");
      }
      // Display tip and total bill on the UI
      const tipAmount = billAmount * tipPercentage;
      const totalBill = billAmount + tipAmount;

      this.displayResults(tipAmount, totalBill);
    } catch (error) {
      // Handle errors gracefully by displaying a pop-up
      this.showError(error.message);
    }
  }

  validateBillAmount(billAmount) {
    if (isNaN(billAmount) || billAmount <= 0) {
      throw new Error("Please enter a valid positive bill amount.");
    }
  }

  validateServiceQuality(serviceQuality) {
    if (!serviceQuality) {
      throw new Error("Please select a service quality.");
    }
  }

  displayResults(tipAmount, totalBill) {
    this.tipAMountElement.textContent = tipAmount.toFixed(2);
    this.totalBillElement.textContent = totalBill.toFixed(2);
  }

  // Function to display the error pop-up with a given message
  showError(message) {
    // Set the error message text
    errorMessage.textContent = message;

    // Show the error pop-up
    errorPopup.style.display = "flex";
  }

  // Function to hide the error pop-up
  hideError() {
    const errorPopup = document.getElementById("errorPopup");
    errorPopup.style.display = "none";
  }

  resetForm() {
    this.billAmountInput.value = "";
    this.serviceQuality.value = "";
    this.tipAMountElement.textContent = "0.00";
    this.totalBillElement.textContent = "0.00";
  }
}

export default TipCalculator;
