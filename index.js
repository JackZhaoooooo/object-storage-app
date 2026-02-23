// 本地存储键名
const STORAGE_KEY = 'uploaded_images';

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    loadImages();
    setupUploadHandlers();
});

// 设置上传处理器
function setupUploadHandlers() {
    const uploadArea = document.getElementById('uploadArea');
    const selectFileBtn = document.getElementById('selectFileBtn');
    const fileInput = document.getElementById('fileInput');

    // 点击选择文件按钮
    selectFileBtn.addEventListener('click', () => {
        fileInput.click();
    });

    // 监听文件选择
    fileInput.addEventListener('change', (e) => {
        handleFiles(e.target.files);
    });

    // 拖拽事件
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('drag-over');
    });

    uploadArea.addEventListener('dragleave', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('drag-over');
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('drag-over');
        handleFiles(e.dataTransfer.files);
    });
}

// 处理文件
function handleFiles(files) {
    const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length === 0) {
        alert('请选择图片文件！');
        return;
    }

    let uploadCount = 0;
    const total = imageFiles.length;

    imageFiles.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
            saveImage(file.name, e.target.result);
            uploadCount++;
            updateProgress((uploadCount / total) * 100);
            
            if (uploadCount === total) {
                loadImages();
                hideProgress();
            }
        };
        reader.readAsDataURL(file);
    });
}

// 更新进度条
function updateProgress(percent) {
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    document.getElementById('uploadProgress').classList.remove('hidden');
    progressFill.style.width = percent + '%';
    progressText.textContent = `上传中... ${Math.round(percent)}%`;
}

// 隐藏进度条
function hideProgress() {
    setTimeout(() => {
        document.getElementById('uploadProgress').classList.add('hidden');
    }, 1000);
}

// 保存图片到本地存储
function saveImage(name, dataUrl) {
    const images = getStoredImages();
    const imageData = {
        id: Date.now() + Math.random(),
        name: name,
        data: dataUrl,
        uploadedAt: new Date().toISOString(),
        size: (dataUrl.length * 3 / 4).toFixed(2) + ' bytes'
    };
    images.unshift(imageData);
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(images));
    } catch (e) {
        console.error('存储空间不足');
        alert('存储空间不足，请删除一些图片后重试');
    }
}

// 获取存储的图片
function getStoredImages() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch (e) {
        return [];
    }
}

// 加载图片
function loadImages() {
    const galleryGrid = document.getElementById('galleryGrid');
    const emptyState = document.getElementById('emptyState');
    const images = getStoredImages();

    if (images.length === 0) {
        galleryGrid.innerHTML = '';
        emptyState.classList.remove('hidden');
        return;
    }

    emptyState.classList.add('hidden');
    galleryGrid.innerHTML = images.map(img => `
        <div class="image-card">
            <div class="image-wrapper">
                <img src="${img.data}" alt="${img.name}">
                <div class="image-overlay">
                    <button class="action-btn" onclick="previewImage('${img.id}')" title="预览">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn" onclick="downloadImage('${img.id}')" title="下载">
                        <i class="fas fa-download"></i>
                    </button>
                    <button class="action-btn delete" onclick="deleteImage('${img.id}')" title="删除">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <div class="image-info">
                <p class="image-name">${img.name}</p>
                <p class="image-meta">${img.uploadedAt.slice(0, 10)} · ${formatFileSize(img.data.length)}</p>
            </div>
        </div>
    `).join('');
}

// 格式化文件大小
function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

// 预览图片
function previewImage(id) {
    const images = getStoredImages();
    const img = images.find(i => i.id == id);
    if (img) {
        window.open(img.data, '_blank');
    }
}

// 下载图片
function downloadImage(id) {
    const images = getStoredImages();
    const img = images.find(i => i.id == id);
    if (img) {
        const link = document.createElement('a');
        link.href = img.data;
        link.download = img.name;
        link.click();
    }
}

// 删除图片
function deleteImage(id) {
    if (confirm('确定要删除这张图片吗？')) {
        const images = getStoredImages().filter(i => i.id != id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(images));
        loadImages();
    }
}

// 清空全部
function clearAll() {
    if (confirm('确定要清空所有图片吗？此操作不可恢复！')) {
        localStorage.removeItem(STORAGE_KEY);
        loadImages();
    }
}
