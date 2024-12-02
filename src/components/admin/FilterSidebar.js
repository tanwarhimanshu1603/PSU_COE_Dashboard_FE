import React, { useState } from 'react';
import '../../css/admin/FilterSidebar.css'
const FilterSidebar = ({
    selectedSkills, setSelectedSkills,
    selectedSubdomains, setSelectedSubdomains,
    selectedDomains, setSelectedDomains,
    isFilterSidebarOpen, setIsFilterSidebarOpen,applyFilters,
    resetSearchAndFilters
  }) => {
    // State to manage open dropdown and selected items for each category
    const [activeDropdown, setActiveDropdown] = useState(null); // Track which dropdown is open
    const skills = ["HTML & CSS", "Bootstrap", "Java", "Node.Js", "React JS", "Mango DB","Python","Ruby"];
    const subdomains = ["OH", "OC", "DigitalMass"];
    const domains = ["D1", "C1", "R1","Telecom "];

    const closePanels = () => {
        setIsFilterSidebarOpen(false);
      };
    const toggleDropdown = (dropdown) => {
        setActiveDropdown(prevState => (prevState === dropdown ? null : dropdown)); // Toggle between dropdowns
    };

    const handleSelection = (category, item) => {
        if (category === 'skills') {
            setSelectedSkills(prevState => {
                if (prevState.includes(item)) {
                    return prevState.filter(skill => skill !== item); // Deselect the item
                }
                return [...prevState, item]; // Select the item
            });
        } else if (category === 'subdomains') {
            setSelectedSubdomains(prevState => {
                if (prevState.includes(item)) {
                    return prevState.filter(subdomain => subdomain !== item);
                }
                return [...prevState, item];
            });
        } else if (category === 'domains') {
            setSelectedDomains(prevState => {
                if (prevState.includes(item)) {
                    return prevState.filter(domain => domain !== item);
                }
                return [...prevState, item];
            });
        }
    };

    const renderDropdown = (category, items, selectedItems) => (
        <div className="dropdown-box">
            <div className={`select-btn ${category === activeDropdown ? 'open' : ''}`} onClick={() => toggleDropdown(category)}>
                <span className="btn-text">{`Select ${category.charAt(0).toUpperCase() + category.slice(1)}`}</span>
                <span className="arrow-dwn">
                    <i className="fa-solid fa-chevron-down"></i>
                </span>
            </div>
            {activeDropdown === category && (
                <ul className="list-items">
                    {items.map((item, index) => (
                        <li
                            key={index}
                            className={`item ${selectedItems.includes(item) ? 'checked' : ''}`}
                            onClick={() => handleSelection(category, item)}
                        >
                            <span className="checkbox">
                                {selectedItems.includes(item) && <i className="fa-solid fa-check check-icon"></i>}
                            </span>
                            <span className="item-text">{item}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );

    return (
        <div className={`dropdown-container ${isFilterSidebarOpen ? 'open' : ''}`}>
            <div className='close-button' onClick={closePanels}><i class="fa-solid fa-xmark"></i></div>
            
            {renderDropdown('skills', skills, selectedSkills)}
            {renderDropdown('subdomains', subdomains, selectedSubdomains)}
            {renderDropdown('domains', domains, selectedDomains)}

            {/* <div>
                <h4>Selected Filters:</h4>
                <p><strong>Skills:</strong> {selectedSkills.join(', ')}</p>
                <p><strong>Subdomains:</strong> {selectedSubdomains.join(', ')}</p>
                <p><strong>Domains:</strong> {selectedDomains.join(', ')}</p>
            </div> */}
            <div className='button-container'>
            <button className='reset-filter-button' onClick={resetSearchAndFilters}>Reset</button>
            <button className='apply-filter-button' onClick={()=>applyFilters()}>Apply</button>
            </div>
        </div>
    );
};

export default FilterSidebar;
