'use client';

import { useEffect, useState } from 'react';
import supabase from '../../../lib/supabase';

const PostPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // 画像をSupabaseストレージにアップロード
      let imageUrl = '';
      if (image) {
        const { data, error } = await supabase.storage
          .from('public_files')
          .upload(`posts/${Date.now()}_${image.name}`, image);

        if (error) {
          throw new Error('画像のアップロードに失敗しました');
        }

        imageUrl = data.path;
      }

      // 投稿データをデータベースに挿入
      const { error: dbError } = await supabase.from('posts').insert({
        lostitem_name : title,
        comment : description,
        find_date : date,
        find_time : time,
        find_place : location,
        remarks_column : additionalInfo,
        file_url : imageUrl,
      });

      if (dbError) {
        throw new Error('投稿の作成に失敗しました');
      }

      setSuccess('投稿が成功しました！');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <div className="text-center mt-10 mb-10">
        <p>-----------------------------------</p>
        <p>ヘッダー</p>
        <p>-----------------------------------</p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="mb-6">
          <label htmlFor="title" className="block text-sm font-bold text-black text-left">落し物:</label>
          <input
            type="text"
            id="title"
            placeholder='落し物を入力してください'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="description" className="block text-sm font-bold text-black text-left">落し物詳細:</label>
          <textarea
            id="description"
            placeholder='落し物の詳細を入力してください'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          ></textarea>
        </div>
        <div className="flex space-x-4 mb-6">
          <div className="flex-1">
            <label htmlFor="date" className="block text-sm font-bold text-black text-left">発見日:</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="time" className="block text-sm font-bold text-black text-left">発見時間:</label>
            <input
              type="time"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
        </div>
        <div className="mb-6">
          <label htmlFor="location" className="block text-sm font-bold text-black text-left">発見場所:</label>
          <input
            type="text"
            id="location"
            placeholder='発見場所を入力してください'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="additionalInfo" className="block text-sm font-bold text-black text-left">備考欄:</label>
          <textarea
            id="additionalInfo"
            placeholder='その他の情報を入力してください'
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          ></textarea>
        </div>
        <div className="mb-6">
          <label htmlFor="image" className="block text-sm font-bold text-black mb-2 text-left">画像などのファイルをアップロード:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
            className="mt-4"
          />
          <p className="block mt-3 text-xs text-red-500 text-left">不適切な画像のアップロードは禁止されています</p>
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`p-2 w-1/2 mt-12 bg-black text-white rounded-md mx-auto ${loading ? 'bg-gray-700' : 'hover:bg-gray-900'}`}
        >
          {loading ? '投稿中...' : '投稿する'}
        </button>
      </form>
      {error && <p className="text-red-500 mt-10">{error}</p>}
      {success && <p className="text-green-500 mt-10">{success}</p>}
      <div className="text-center mt-10 mb-10">
        <p>-----------------------------------</p>
        <p>フッター</p>
        <p>-----------------------------------</p>
      </div>
    </div>
  );
};

export default PostPage;
