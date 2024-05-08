

  $(document).ready(function() {
    var addButtons = $('.add');
    var subButtons = $('.sub');
    var cancelButtons = $('.cancel');
    var rows = $('tr');

    cancelButtons.click(function() {
      var index = cancelButtons.index(this);
      rows.eq(index + 1).remove();
      calculateTotalPrice();
    });

    var quantityInputs = $('input[type="number"]');
    var priceElements = $('td:nth-child(4)');
    var discountElements = $('td:nth-child(5)');
    var taxElements = $('td:nth-child(6)');
    var totalElements = $('td:nth-child(7)');

    addButtons.click(function() {
      var index = addButtons.index(this);
      quantityInputs.eq(index).val(function(i, value) {
        return parseInt(value) + 1;
      });
      updateTotal(index);
    });

    subButtons.click(function() {
      var index = subButtons.index(this);
      quantityInputs.eq(index).val(function(i, value) {
        var quantity = parseInt(value);
        if (quantity > 0) {
          return quantity - 1;
        }
        return quantity;
      });
      updateTotal(index);
    });

    quantityInputs.on('input', function() {
      var index = quantityInputs.index(this);
      updateTotal(index);
    });

    function updateTotal(index) {
        var quantity = parseInt(quantityInputs.eq(index).val());
        var price = parseFloat(priceElements.eq(index).text().replace('$', ''));
        var discount = quantity === 0 ? 0 : parseFloat(discountElements.eq(index).text().replace('$', '')) || 0;
        var tax = quantity * price * 0.125;
        var total = quantity * price - discount + tax;
        totalElements.eq(index).text('$' + total.toFixed(1));
        taxElements.eq(index).text('$' + tax.toFixed(1));
        calculateTotalPrice();
      }
      

    function calculateTotalPrice() {
      var total = 0;
      var discount = 0;
      var tax = 0;

      totalElements.each(function(index) {
        total += parseFloat($(this).text().replace('$', ''));
        discount += parseFloat(discountElements.eq(index).text().replace('$', ''));
        tax += parseFloat(taxElements.eq(index).text().replace('$', ''));
      });

      totalDiscount = discount;
      totalTax = tax;
      $('#total-price').text('$' + total.toFixed(1));
      $('#total-discount').text('$' + discount.toFixed(1));
      $('#total-tax').text('$' + tax.toFixed(1));
    }

    calculateTotalPrice();
  });

