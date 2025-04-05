import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import { FiPlus, FiEdit, FiTrash2, FiX, FiCheck, FiAlertCircle } from 'react-icons/fi';

const Admin = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [notification, setNotification] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    author: '',
    authorTitle: '',
    category: 'Wellness',
    imageUrl: '',
    readTime: ''
  });

  const categories = ['Mental Health', 'Nutrition', 'Fitness', 'Preventive Care', 'Wellness'];

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const blogsRef = collection(db, 'blogs');
      const snapshot = await getDocs(blogsRef);
      
      const fetchedBlogs = [];
      snapshot.forEach((doc) => {
        fetchedBlogs.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      setBlogs(fetchedBlogs);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      showNotification('Error fetching blogs', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      summary: '',
      content: '',
      author: '',
      authorTitle: '',
      category: 'Wellness',
      imageUrl: '',
      readTime: ''
    });
    setIsEditing(false);
    setSelectedBlog(null);
  };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (blog) => {
    setIsEditing(true);
    setSelectedBlog(blog);
    setFormData({
      title: blog.title || '',
      summary: blog.summary || '',
      content: blog.content || '',
      author: blog.author || '',
      authorTitle: blog.authorTitle || '',
      category: blog.category || 'Wellness',
      imageUrl: blog.imageUrl || '',
      readTime: blog.readTime || ''
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    
    // Clear notification after 3 seconds
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (!formData.title || !formData.summary || !formData.content) {
        showNotification('Please fill all required fields', 'error');
        return;
      }
      
      if (isEditing && selectedBlog) {
        // Update existing blog
        const blogRef = doc(db, 'blogs', selectedBlog.id);
        await updateDoc(blogRef, {
          ...formData,
          updatedAt: serverTimestamp()
        });
        
        showNotification('Blog updated successfully!');
      } else {
        // Add new blog
        await addDoc(collection(db, 'blogs'), {
          ...formData,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
        
        showNotification('Blog added successfully!');
      }
      
      // Refetch blogs and close modal
      fetchBlogs();
      closeModal();
    } catch (error) {
      console.error('Error saving blog:', error);
      showNotification('Error saving blog', 'error');
    }
  };

  const handleDelete = async (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog post? This action cannot be undone.')) {
      try {
        await deleteDoc(doc(db, 'blogs', blogId));
        showNotification('Blog deleted successfully!');
        fetchBlogs();
      } catch (error) {
        console.error('Error deleting blog:', error);
        showNotification('Error deleting blog', 'error');
      }
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    
    const date = timestamp instanceof Date 
      ? timestamp 
      : new Date(timestamp.seconds ? timestamp.seconds * 1000 : timestamp);
    
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Blog Management</h1>
        <button
          onClick={openAddModal}
          className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
        >
          <FiPlus className="mr-2" /> Add New Blog
        </button>
      </div>

      {/* Notification */}
      {notification && (
        <div className={`mb-6 p-4 rounded-lg flex items-center ${
          notification.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
        }`}>
          {notification.type === 'error' ? (
            <FiAlertCircle className="mr-2" />
          ) : (
            <FiCheck className="mr-2" />
          )}
          {notification.message}
        </div>
      )}

      {/* Blogs Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading blogs...</p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-600 mb-4">No blog posts found. Add your first blog post!</p>
            <button
              onClick={openAddModal}
              className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
            >
              <FiPlus className="mr-2" /> Add Blog Post
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Author
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {blogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{blog.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary/10 text-primary">
                        {blog.category || 'Uncategorized'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {blog.author || 'Anonymous'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(blog.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => openEditModal(blog)}
                        className="text-primary hover:text-primary/80 mr-3"
                      >
                        <FiEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(blog.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add/Edit Blog Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center border-b px-6 py-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {isEditing ? 'Edit Blog Post' : 'Add New Blog Post'}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={24} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 110px)' }}>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Title *
                  </label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    value={formData.title}
                    onChange={handleChange}
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    required
                  />
                </div>
                
                {/* Summary */}
                <div>
                  <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-1">
                    Summary *
                  </label>
                  <textarea
                    id="summary"
                    name="summary"
                    rows="3"
                    value={formData.summary}
                    onChange={handleChange}
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    required
                  ></textarea>
                </div>
                
                {/* Content */}
                <div>
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                    Content * (HTML allowed)
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    rows="10"
                    value={formData.content}
                    onChange={handleChange}
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary font-mono text-sm"
                    required
                  ></textarea>
                </div>
                
                {/* Two Column Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Author */}
                  <div>
                    <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
                      Author
                    </label>
                    <input
                      id="author"
                      name="author"
                      type="text"
                      value={formData.author}
                      onChange={handleChange}
                      className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                  
                  {/* Author Title */}
                  <div>
                    <label htmlFor="authorTitle" className="block text-sm font-medium text-gray-700 mb-1">
                      Author Title
                    </label>
                    <input
                      id="authorTitle"
                      name="authorTitle"
                      type="text"
                      value={formData.authorTitle}
                      onChange={handleChange}
                      className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                  
                  {/* Category */}
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Read Time */}
                  <div>
                    <label htmlFor="readTime" className="block text-sm font-medium text-gray-700 mb-1">
                      Read Time (e.g. "5 min read")
                    </label>
                    <input
                      id="readTime"
                      name="readTime"
                      type="text"
                      value={formData.readTime}
                      onChange={handleChange}
                      className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                </div>
                
                {/* Image URL */}
                <div>
                  <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
                    Image URL
                  </label>
                  <input
                    id="imageUrl"
                    name="imageUrl"
                    type="text"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="https://example.com/image.jpg"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    If left blank, a placeholder image will be used.
                  </p>
                </div>
                
                {/* Submit and Cancel Buttons */}
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                  >
                    {isEditing ? 'Update Blog' : 'Add Blog'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin; 