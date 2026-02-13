import React, { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  company: string;
  job_title: string;
  company_size: string;
}

export default function SqueezeForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    job_title: '',
    company_size: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/rd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar formulário');
      }

      // Redirecionar para a página de download
      window.location.href = '/decreto-plastico/material-para-download';
    } catch (err) {
      setError('Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.');
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="squeeze-form">
      <div className="form-group">
        <input
          type="text"
          name="name"
          placeholder="Seu nome"
          value={formData.name}
          onChange={handleChange}
          required
          className="form-input"
        />
      </div>

      <div className="form-group">
        <input
          type="email"
          name="email"
          placeholder="Seu melhor e-mail corporativo"
          value={formData.email}
          onChange={handleChange}
          required
          className="form-input"
        />
      </div>

      <div className="form-group">
        <input
          type="text"
          name="company"
          placeholder="Nome da sua empresa"
          value={formData.company}
          onChange={handleChange}
          required
          className="form-input"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <input
            type="text"
            name="job_title"
            placeholder="Seu cargo"
            value={formData.job_title}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <select
            name="company_size"
            value={formData.company_size}
            onChange={handleChange}
            required
            className="form-select"
          >
            <option value="">Tamanho da empresa</option>
            <option value="1-10 funcionários">1-10 funcionários</option>
            <option value="11-50 funcionários">11-50 funcionários</option>
            <option value="51-200 funcionários">51-200 funcionários</option>
            <option value="201-1000 funcionários">201-1000 funcionários</option>
            <option value="1001+ funcionários">1001+ funcionários</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="form-error">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="form-submit"
      >
        {isSubmitting ? 'Enviando...' : 'Baixar o White Paper Agora'}
      </button>

      <style>{`
        .squeeze-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .form-input,
        .form-select {
          width: 100%;
          padding: 0.875rem 1rem;
          border: 1px solid #e0e0e0;
          border-radius: 6px;
          font-size: 0.95rem;
          font-family: 'Inter', sans-serif;
          color: #1a1a1a;
          background: #ffffff;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .form-input:focus,
        .form-select:focus {
          outline: none;
          border-color: #5499a3;
          box-shadow: 0 0 0 3px rgba(84, 153, 163, 0.1);
        }

        .form-input::placeholder {
          color: #999999;
        }

        .form-select {
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666666' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 1rem center;
          padding-right: 2.5rem;
        }

        .form-select option:first-child {
          color: #999999;
        }

        .form-error {
          padding: 0.75rem;
          background: #fef2f2;
          border: 1px solid #fca5a5;
          border-radius: 6px;
          color: #dc2626;
          font-size: 0.875rem;
        }

        .form-submit {
          width: 100%;
          padding: 1rem 2rem;
          background: #eaab75;
          color: #ffffff;
          border: none;
          border-radius: 6px;
          font-size: 1rem;
          font-weight: 600;
          font-family: 'Sora', sans-serif;
          cursor: pointer;
          transition: background 0.2s ease, transform 0.2s ease;
        }

        .form-submit:hover:not(:disabled) {
          background: #e39a5f;
          transform: translateY(-1px);
        }

        .form-submit:active:not(:disabled) {
          transform: translateY(0);
        }

        .form-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        @media (max-width: 640px) {
          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </form>
  );
}