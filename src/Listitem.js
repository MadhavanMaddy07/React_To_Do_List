import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Additem from './Additem';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Listitem = () => {
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem('items');
    return savedItems ? JSON.parse(savedItems) : [
      { id: 1, checked: true, item: "Play" },
      { id: 2, checked: false, item: "Study" }
    ];
  });

  const [additems, setAdditems] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  const addItem = (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const newArr = { id, checked: false, item };
    const listArr = [...items, newArr];
    setItems(listArr);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!additems) return;
    addItem(additems);
    setAdditems("");
  };

  const handleCheck = (id) => {
    const newItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(newItems);
  };

  const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);
  };

  const handleEdit = (id, item) => {
    setEditId(id);
    setEditText(item);
    setShow(true)
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const newItems = items.map((item) =>
      item.id === editId ? { ...item, item: editText } : item
    );
    setItems(newItems);
    setEditId(null);
    setEditText("");
    setShow(false)
  };
  

  return (
    <>
    <div className="container">
      <Additem
        additems={additems}
        setAdditems={setAdditems}
        handlesubmit={handleSubmit}
      />
      <div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Task Update</Modal.Title>
        </Modal.Header>
        <Modal.Body >
        <input className='modalinput' type="text" value={editText} onChange={(e) => setEditText(e.target.value)}/>
  
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
      {items.length ? (
        <Table striped bordered hover className='Table'>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td className='text-center my-auto'>
                  <input
                    type="checkbox"
                    onChange={() => handleCheck(item.id)}
                    checked={item.checked}
                  />
                </td>
               
                    <td className='text-center'>{item.item}</td>
                    <td className='text-center'>
                      <button className='btn btn-success' onClick={() => handleEdit(item.id, item.item)}>
                        Edit
                      </button>
                    </td>
                <td className='text-center'>
                  <button  className='btn btn-danger'  onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <h2 className='EmptyMsg text-center'>The Task is Empty</h2>
      )}
      </div>
    </>
  );
};

export default Listitem;
