import React, { useState } from 'react';
import './SqueezeForm.css';


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
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Erro ao enviar formulário');
      }

      // Redirecionar para a página de download
      window.location.href = '/decreto-plastico/material-para-download';
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.');
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
    </form>
  );
}
