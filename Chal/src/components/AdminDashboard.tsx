import { useState, useEffect } from 'react';
import { getAllContacts, updateContactStatus } from '../services/contactService';

interface Contact {
  id: string;
  name: string;
  email: string;
  company: string;
  service: string;
  duration: string;
  message: string;
  status: string;
  created_at: string;
}

export function AdminDashboard() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const loadContacts = async () => {
    try {
      setLoading(true);
      const data = await getAllContacts();
      setContacts(data || []);
      setError(null);
    } catch (err) {
      setError('Failed to load contacts');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await updateContactStatus(id, newStatus);
      await loadContacts();
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-[#A92424] text-[#F7EED2]';
      case 'contacted':
        return 'bg-[#D4A574] text-[#362C28]';
      case 'in-progress':
        return 'bg-[#5A3710] text-[#F7EED2]';
      case 'completed':
        return 'bg-[#362C28] text-[#F7EED2]';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7EED2] flex items-center justify-center">
        <div className="text-2xl text-[#362C28]">Loading submissions...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F7EED2] flex items-center justify-center">
        <div className="text-2xl text-[#A92424]">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7EED2]">
      <div className="border-b border-[#362C28] p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-4xl text-[#362C28] mb-2">Admin Dashboard</h1>
            <p className="text-sm text-[#362C28] opacity-70">
              {contacts.length} total submissions
            </p>
          </div>
          <button
            onClick={loadContacts}
            className="px-6 py-3 bg-[#362C28] text-[#F7EED2] text-xs uppercase tracking-widest hover:bg-[#5A3710] transition-colors"
          >
            Refresh
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid gap-4">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="border border-[#362C28] bg-white p-6 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedContact(contact)}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl text-[#362C28] font-semibold mb-1">
                    {contact.name}
                  </h3>
                  <p className="text-sm text-[#362C28] opacity-70">
                    {contact.email}
                  </p>
                  {contact.company && (
                    <p className="text-sm text-[#362C28] opacity-70">
                      {contact.company}
                    </p>
                  )}
                </div>
                <div className="flex flex-col items-end gap-2">
                  <select
                    value={contact.status}
                    onChange={(e) => {
                      e.stopPropagation();
                      handleStatusChange(contact.id, e.target.value);
                    }}
                    className={`px-3 py-1 text-xs uppercase tracking-wider rounded ${getStatusColor(
                      contact.status
                    )}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                  <span className="text-xs text-[#362C28] opacity-50">
                    {formatDate(contact.created_at)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#362C28] opacity-50">
                    Service
                  </span>
                  <p className="text-sm text-[#362C28]">{contact.service}</p>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#362C28] opacity-50">
                    Duration
                  </span>
                  <p className="text-sm text-[#362C28]">{contact.duration}</p>
                </div>
              </div>

              <div>
                <span className="text-xs uppercase tracking-wider text-[#362C28] opacity-50 block mb-1">
                  Message
                </span>
                <p className="text-sm text-[#362C28] line-clamp-2">
                  {contact.message}
                </p>
              </div>
            </div>
          ))}
        </div>

        {contacts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-[#362C28] opacity-50">
              No submissions yet
            </p>
          </div>
        )}
      </div>

      {selectedContact && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedContact(null)}
        >
          <div
            className="bg-[#F7EED2] border-2 border-[#362C28] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-3xl text-[#362C28]">Submission Details</h2>
              <button
                onClick={() => setSelectedContact(null)}
                className="text-[#362C28] hover:text-[#A92424] text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#362C28] opacity-50 block mb-1">
                  Name
                </span>
                <p className="text-lg text-[#362C28]">{selectedContact.name}</p>
              </div>

              <div>
                <span className="text-xs uppercase tracking-wider text-[#362C28] opacity-50 block mb-1">
                  Email
                </span>
                <a
                  href={`mailto:${selectedContact.email}`}
                  className="text-lg text-[#5A3710] hover:text-[#A92424]"
                >
                  {selectedContact.email}
                </a>
              </div>

              {selectedContact.company && (
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#362C28] opacity-50 block mb-1">
                    Company
                  </span>
                  <p className="text-lg text-[#362C28]">
                    {selectedContact.company}
                  </p>
                </div>
              )}

              <div>
                <span className="text-xs uppercase tracking-wider text-[#362C28] opacity-50 block mb-1">
                  Service
                </span>
                <p className="text-lg text-[#362C28]">
                  {selectedContact.service}
                </p>
              </div>

              <div>
                <span className="text-xs uppercase tracking-wider text-[#362C28] opacity-50 block mb-1">
                  Duration
                </span>
                <p className="text-lg text-[#362C28]">
                  {selectedContact.duration}
                </p>
              </div>

              <div>
                <span className="text-xs uppercase tracking-wider text-[#362C28] opacity-50 block mb-1">
                  Message
                </span>
                <p className="text-base text-[#362C28] leading-relaxed whitespace-pre-wrap">
                  {selectedContact.message}
                </p>
              </div>

              <div>
                <span className="text-xs uppercase tracking-wider text-[#362C28] opacity-50 block mb-1">
                  Status
                </span>
                <select
                  value={selectedContact.status}
                  onChange={(e) => {
                    handleStatusChange(selectedContact.id, e.target.value);
                    setSelectedContact({
                      ...selectedContact,
                      status: e.target.value,
                    });
                  }}
                  className={`px-4 py-2 text-sm uppercase tracking-wider rounded ${getStatusColor(
                    selectedContact.status
                  )}`}
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div>
                <span className="text-xs uppercase tracking-wider text-[#362C28] opacity-50 block mb-1">
                  Submitted
                </span>
                <p className="text-sm text-[#362C28]">
                  {formatDate(selectedContact.created_at)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
