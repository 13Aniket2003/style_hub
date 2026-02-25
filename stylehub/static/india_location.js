document.addEventListener("DOMContentLoaded", function () {

    const indiaData = {
        "Andhra Pradesh": ["Anantapur", "Chittoor", "Guntur", "Kadapa", "Krishna"],
        "Arunachal Pradesh": ["Tawang", "Itanagar", "Ziro"],
        "Assam": ["Guwahati", "Dibrugarh", "Silchar"],
        "Bihar": ["Patna", "Gaya", "Bhagalpur"],
        "Chhattisgarh": ["Raipur", "Bilaspur", "Durg"],
        "Delhi": ["Central Delhi", "East Delhi", "New Delhi"],
        "Goa": ["North Goa", "South Goa"],
        "Gujarat": ["Ahmedabad", "Surat", "Vadodara"],
        "Haryana": ["Gurgaon", "Faridabad", "Panipat"],
        "Himachal Pradesh": ["Shimla", "Kullu", "Manali"],
        "Jharkhand": ["Ranchi", "Dhanbad", "Bokaro"],
        "Karnataka": ["Bangalore", "Mysore", "Mangalore"],
        "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode"],
        "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior"],
        "Maharashtra": ["Mumbai", "Pune", "Nagpur"],
        "Odisha": ["Bhubaneswar", "Cuttack", "Puri"],
        "Punjab": ["Amritsar", "Ludhiana", "Jalandhar"],
        "Rajasthan": ["Jaipur", "Udaipur", "Jodhpur"],
        "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
        "Telangana": ["Hyderabad", "Warangal", "Karimnagar"],
        "Uttar Pradesh": ["Lucknow", "Kanpur", "Noida"],
        "Uttarakhand": ["Dehradun", "Haridwar"],
        "West Bengal": ["Kolkata", "Howrah", "Nadia", "Darjeeling"]
    };

    const stateSelect = document.getElementById("state");
    const districtSelect = document.getElementById("district");

    if (!stateSelect || !districtSelect) {
        console.error("Dropdown elements not found");
        return;
    }

    // Load states
    Object.keys(indiaData).forEach(state => {
        const opt = document.createElement("option");
        opt.value = state;
        opt.textContent = state;
        stateSelect.appendChild(opt);
    });

    // Load districts
    stateSelect.addEventListener("change", function () {
        districtSelect.innerHTML = "<option value=''>Select District</option>";
        (indiaData[this.value] || []).forEach(district => {
            const opt = document.createElement("option");
            opt.value = district;
            opt.textContent = district;
            districtSelect.appendChild(opt);
        });
    });

    console.log("✅ India State–District dropdown loaded");
});