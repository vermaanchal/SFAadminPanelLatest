import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MenuAccordion = ({ menu }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = index => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <div style={{ width: '300px', border: '1px solid #ddd', borderRadius: '6px' }}>
      {menu.map((section, index) => (
        <div key={section.id} style={{ borderBottom: '1px solid #eee' }}>
          <div
            onClick={() => toggle(index)}
            style={{
              padding: '10px',
              cursor: 'pointer',
              fontWeight: 'bold',
              background: '#f7f7f7'
            }}
          >
            {section.title}
          </div>

          {openIndex === index && (
            <ul style={{ listStyle: 'none', padding: '0 20px', margin: '10px 0' }}>
              {section.children?.map(item => (
                <li key={item.id} style={{ marginBottom: '8px' }}>
                  <Link to={item.url} style={{ textDecoration: 'none', color: '#333' }}>
                    <span style={{ marginRight: '8px' }}>{item.icon}</span>
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default MenuAccordion;
