// 设备管理页面的JavaScript逻辑

// 模拟设备数据
const equipmentData = [
  {
    id: 'EQ001',
    name: '卡特彼勒挖掘机',
    type: '挖掘机',
    model: 'CAT 320',
    year: 2021,
    dailyRent: 3500,
    location: '上海',
    status: 'available',
    image: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'EQ002',
    name: '徐工起重机',
    type: '起重机',
    model: 'XCT25L5',
    year: 2020,
    dailyRent: 4200,
    location: '北京',
    status: 'rented',
    image: 'https://images.unsplash.com/photo-1570991162250-6d1c23d9b180?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'EQ003',
    name: '三一重工泵车',
    type: '混凝土设备',
    model: 'SYM5419THB',
    year: 2022,
    dailyRent: 3800,
    location: '广州',
    status: 'maintenance',
    image: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'EQ004',
    name: '小松推土机',
    type: '推土机',
    model: 'D85E-SS-2',
    year: 2019,
    dailyRent: 2800,
    location: '深圳',
    status: 'available',
    image: 'https://images.unsplash.com/photo-1563203369-26f2e4a5ccf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'EQ005',
    name: '利勃海尔塔吊',
    type: '起重机',
    model: '280 EC-H',
    year: 2020,
    dailyRent: 5000,
    location: '成都',
    status: 'rented',
    image: 'https://images.unsplash.com/photo-1508515053963-70c7cc39dfb5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'EQ006',
    name: '山推压路机',
    type: '压路机',
    model: 'SR20M',
    year: 2021,
    dailyRent: 2200,
    location: '武汉',
    status: 'available',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'EQ007',
    name: '中联重科装载机',
    type: '装载机',
    model: 'ZL50GN',
    year: 2022,
    dailyRent: 2600,
    location: '重庆',
    status: 'unavailable',
    image: 'https://images.unsplash.com/photo-1579412690850-bd41cd0af56d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'EQ008',
    name: '日立液压挖掘机',
    type: '挖掘机',
    model: 'ZX350LC-6',
    year: 2020,
    dailyRent: 3200,
    location: '南京',
    status: 'available',
    image: 'https://images.unsplash.com/photo-1504309092620-4d0ec726efa4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'EQ009',
    name: '斗山轮式装载机',
    type: '装载机',
    model: 'DL450',
    year: 2021,
    dailyRent: 2800,
    location: '天津',
    status: 'rented',
    image: 'https://images.unsplash.com/photo-1549036184-0df11629286a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'EQ010',
    name: '柳工叉车',
    type: '其他设备',
    model: 'CPCD50',
    year: 2022,
    dailyRent: 1800,
    location: '杭州',
    status: 'available',
    image: 'https://images.unsplash.com/photo-1542292714-0604fca73d73?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  }
];

// 状态映射
const statusMap = {
  'available': { text: '可租赁', class: 'badge-success' },
  'rented': { text: '已租出', class: 'badge-info' },
  'maintenance': { text: '维护中', class: 'badge-warning' },
  'unavailable': { text: '不可用', class: 'badge-danger' }
};

// 渲染设备列表
function renderEquipmentList(data) {
  const tableBody = document.querySelector('.custom-table tbody');
  tableBody.innerHTML = '';
  
  data.forEach(item => {
    const row = document.createElement('tr');
    
    row.innerHTML = `
      <td>
        <input type="checkbox" class="form-checkbox" data-id="${item.id}">
      </td>
      <td>
        <div class="flex items-center">
          <div class="w-10 h-10 flex-shrink-0 mr-3 bg-gray-100 rounded overflow-hidden">
            <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover">
          </div>
          <div>
            <div class="font-medium text-gray-800">${item.name}</div>
            <div class="text-xs text-gray-500">ID: ${item.id}</div>
          </div>
        </div>
      </td>
      <td>${item.type}</td>
      <td>${item.model}</td>
      <td>${item.year}</td>
      <td>¥${item.dailyRent}</td>
      <td>${item.location}</td>
      <td><span class="badge ${statusMap[item.status].class}">${statusMap[item.status].text}</span></td>
      <td class="text-right">
        <button class="btn btn-sm bg-blue-50 text-blue-600 mr-1 edit-btn" data-id="${item.id}">
          <i class="fas fa-edit"></i>
        </button>
        <button class="btn btn-sm bg-red-50 text-red-600 delete-btn" data-id="${item.id}">
          <i class="fas fa-trash-alt"></i>
        </button>
      </td>
    `;
    
    tableBody.appendChild(row);
  });
  
  // 添加编辑和删除按钮事件
  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      openEditModal(id);
    });
  });
  
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      confirmDelete(id);
    });
  });
}

// 打开添加设备弹窗
function openAddModal() {
  const modal = document.getElementById('add-equipment-modal');
  const form = document.getElementById('add-equipment-form');
  
  // 创建表单内容
  form.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="form-group">
        <label class="form-label" for="equipment-name">设备名称</label>
        <input type="text" id="equipment-name" name="name" class="form-control" required>
      </div>
      
      <div class="form-group">
        <label class="form-label" for="equipment-type">设备类型</label>
        <select id="equipment-type" name="type" class="form-control" required>
          <option value="">选择类型</option>
          <option value="挖掘机">挖掘机</option>
          <option value="装载机">装载机</option>
          <option value="推土机">推土机</option>
          <option value="起重机">起重机</option>
          <option value="压路机">压路机</option>
          <option value="混凝土设备">混凝土设备</option>
          <option value="其他设备">其他设备</option>
        </select>
      </div>
      
      <div class="form-group">
        <label class="form-label" for="equipment-model">品牌型号</label>
        <input type="text" id="equipment-model" name="model" class="form-control" required>
      </div>
      
      <div class="form-group">
        <label class="form-label" for="equipment-year">出厂年份</label>
        <input type="number" id="equipment-year" name="year" class="form-control" min="1980" max="2023" required>
      </div>
      
      <div class="form-group">
        <label class="form-label" for="equipment-rent">日租金（元）</label>
        <input type="number" id="equipment-rent" name="dailyRent" class="form-control" min="0" step="100" required>
      </div>
      
      <div class="form-group">
        <label class="form-label" for="equipment-location">所在地</label>
        <select id="equipment-location" name="location" class="form-control" required>
          <option value="">选择地区</option>
          <option value="北京">北京</option>
          <option value="上海">上海</option>
          <option value="广州">广州</option>
          <option value="深圳">深圳</option>
          <option value="成都">成都</option>
          <option value="武汉">武汉</option>
          <option value="重庆">重庆</option>
          <option value="南京">南京</option>
          <option value="天津">天津</option>
          <option value="杭州">杭州</option>
        </select>
      </div>
      
      <div class="form-group">
        <label class="form-label" for="equipment-status">状态</label>
        <select id="equipment-status" name="status" class="form-control" required>
          <option value="available">可租赁</option>
          <option value="rented">已租出</option>
          <option value="maintenance">维护中</option>
          <option value="unavailable">不可用</option>
        </select>
      </div>
      
      <div class="form-group md:col-span-2">
        <label class="form-label" for="equipment-image">设备图片URL</label>
        <input type="url" id="equipment-image" name="image" class="form-control" placeholder="https://example.com/image.jpg">
      </div>
    </div>
    
    <div class="flex items-center justify-end mt-6">
      <button type="button" class="btn bg-gray-200 text-gray-800 mr-2" id="cancel-add-btn">取消</button>
      <button type="submit" class="btn btn-primary">保存设备</button>
    </div>
  `;
  
  // 显示弹窗
  modal.classList.remove('hidden');
  
  // 取消按钮事件
  document.getElementById('cancel-add-btn').addEventListener('click', () => {
    modal.classList.add('hidden');
  });
  
  // 关闭按钮事件
  document.getElementById('close-modal-btn').addEventListener('click', () => {
    modal.classList.add('hidden');
  });
  
  // 表单提交事件
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // 获取表单数据
    const formData = new FormData(form);
    const newEquipment = {
      id: 'EQ' + (Math.floor(Math.random() * 900) + 100),
      name: formData.get('name'),
      type: formData.get('type'),
      model: formData.get('model'),
      year: parseInt(formData.get('year')),
      dailyRent: parseInt(formData.get('dailyRent')),
      location: formData.get('location'),
      status: formData.get('status'),
      image: formData.get('image') || 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    };
    
    // 添加到数据中
    equipmentData.unshift(newEquipment);
    
    // 重新渲染列表
    renderEquipmentList(equipmentData);
    
    // 关闭弹窗
    modal.classList.add('hidden');
    
    // 显示成功消息
    showNotification('设备添加成功', 'success');
  });
}

// 打开编辑设备弹窗
function openEditModal(id) {
  const equipment = equipmentData.find(item => item.id === id);
  if (!equipment) return;
  
  const modal = document.getElementById('add-equipment-modal');
  const form = document.getElementById('add-equipment-form');
  
  // 创建表单内容（与添加表单相同，但填充了数据）
  form.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="form-group">
        <label class="form-label" for="equipment-name">设备名称</label>
        <input type="text" id="equipment-name" name="name" class="form-control" value="${equipment.name}" required>
      </div>
      
      <div class="form-group">
        <label class="form-label" for="equipment-type">设备类型</label>
        <select id="equipment-type" name="type" class="form-control" required>
          <option value="">选择类型</option>
          <option value="挖掘机" ${equipment.type === '挖掘机' ? 'selected' : ''}>挖掘机</option>
          <option value="装载机" ${equipment.type === '装载机' ? 'selected' : ''}>装载机</option>
          <option value="推土机" ${equipment.type === '推土机' ? 'selected' : ''}>推土机</option>
          <option value="起重机" ${equipment.type === '起重机' ? 'selected' : ''}>起重机</option>
          <option value="压路机" ${equipment.type === '压路机' ? 'selected' : ''}>压路机</option>
          <option value="混凝土设备" ${equipment.type === '混凝土设备' ? 'selected' : ''}>混凝土设备</option>
          <option value="其他设备" ${equipment.type === '其他设备' ? 'selected' : ''}>其他设备</option>
        </select>
      </div>
      
      <div class="form-group">
        <label class="form-label" for="equipment-model">品牌型号</label>
        <input type="text" id="equipment-model" name="model" class="form-control" value="${equipment.model}" required>
      </div>
      
      <div class="form-group">
        <label class="form-label" for="equipment-year">出厂年份</label>
        <input type="number" id="equipment-year" name="year" class="form-control" min="1980" max="2023" value="${equipment.year}" required>
      </div>
      
      <div class="form-group">
        <label class="form-label" for="equipment-rent">日租金（元）</label>
        <input type="number" id="equipment-rent" name="dailyRent" class="form-control" min="0" step="100" value="${equipment.dailyRent}" required>
      </div>
      
      <div class="form-group">
        <label class="form-label" for="equipment-location">所在地</label>
        <select id="equipment-location" name="location" class="form-control" required>
          <option value="">选择地区</option>
          <option value="北京" ${equipment.location === '北京' ? 'selected' : ''}>北京</option>
          <option value="上海" ${equipment.location === '上海' ? 'selected' : ''}>上海</option>
          <option value="广州" ${equipment.location === '广州' ? 'selected' : ''}>广州</option>
          <option value="深圳" ${equipment.location === '深圳' ? 'selected' : ''}>深圳</option>
          <option value="成都" ${equipment.location === '成都' ? 'selected' : ''}>成都</option>
          <option value="武汉" ${equipment.location === '武汉' ? 'selected' : ''}>武汉</option>
          <option value="重庆" ${equipment.location === '重庆' ? 'selected' : ''}>重庆</option>
          <option value="南京" ${equipment.location === '南京' ? 'selected' : ''}>南京</option>
          <option value="天津" ${equipment.location === '天津' ? 'selected' : ''}>天津</option>
          <option value="杭州" ${equipment.location === '杭州' ? 'selected' : ''}>杭州</option>
        </select>
      </div>
      
      <div class="form-group">
        <label class="form-label" for="equipment-status">状态</label>
        <select id="equipment-status" name="status" class="form-control" required>
          <option value="available" ${equipment.status === 'available' ? 'selected' : ''}>可租赁</option>
          <option value="rented" ${equipment.status === 'rented' ? 'selected' : ''}>已租出</option>
          <option value="maintenance" ${equipment.status === 'maintenance' ? 'selected' : ''}>维护中</option>
          <option value="unavailable" ${equipment.status === 'unavailable' ? 'selected' : ''}>不可用</option>
        </select>
      </div>
      
      <div class="form-group md:col-span-2">
        <label class="form-label" for="equipment-image">设备图片URL</label>
        <input type="url" id="equipment-image" name="image" class="form-control" value="${equipment.image}" placeholder="https://example.com/image.jpg">
      </div>
    </div>
    
    <input type="hidden" name="id" value="${equipment.id}">
    
    <div class="flex items-center justify-end mt-6">
      <button type="button" class="btn bg-gray-200 text-gray-800 mr-2" id="cancel-edit-btn">取消</button>
      <button type="submit" class="btn btn-primary">保存更改</button>
    </div>
  `;
  
  // 更改弹窗标题
  document.querySelector('#add-equipment-modal h3').textContent = '编辑设备';
  
  // 显示弹窗
  modal.classList.remove('hidden');
  
  // 取消按钮事件
  document.getElementById('cancel-edit-btn').addEventListener('click', () => {
    modal.classList.add('hidden');
  });
  
  // 关闭按钮事件
  document.getElementById('close-modal-btn').addEventListener('click', () => {
    modal.classList.add('hidden');
  });
  
  // 表单提交事件
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // 获取表单数据
    const formData = new FormData(form);
    const updatedEquipment = {
      id: formData.get('id'),
      name: formData.get('name'),
      type: formData.get('type'),
      model: formData.get('model'),
      year: parseInt(formData.get('year')),
      dailyRent: parseInt(formData.get('dailyRent')),
      location: formData.get('location'),
      status: formData.get('status'),
      image: formData.get('image')
    };
    
    // 更新数据
    const index = equipmentData.findIndex(item => item.id === updatedEquipment.id);
    if (index !== -1) {
      equipmentData[index] = updatedEquipment;
    }
    
    // 重新渲染列表
    renderEquipmentList(equipmentData);
    
    // 关闭弹窗
    modal.classList.add('hidden');
    
    // 显示成功消息
    showNotification('设备信息已更新', 'success');
  });
}

// 确认删除设备
function confirmDelete(id) {
  if (confirm('确定要删除此设备吗？此操作无法撤销。')) {
    // 从数据中删除
    const index = equipmentData.findIndex(item => item.id === id);
    if (index !== -1) {
      equipmentData.splice(index, 1);
    }
    
    // 重新渲染列表
    renderEquipmentList(equipmentData);
    
    // 显示成功消息
    showNotification('设备已删除', 'success');
  }
}

// 初始化页面
document.addEventListener('DOMContentLoaded', function() {
  // 设置当前活动菜单项
  setActiveMenuItem();
  
  // 初始化筛选功能
  initializeFilters();
  
  // 初始化设备列表操作
  initializeEquipmentActions();
  
  // 初始化移动端侧边栏
  initializeMobileSidebar();
  
  // 渲染设备列表
  renderEquipmentList(equipmentData);
  
  // 添加设备按钮事件
  document.getElementById('add-equipment-btn').addEventListener('click', openAddModal);
  
  // 实现搜索功能
  const searchInput = document.querySelector('input[placeholder="搜索设备..."]');
  searchInput.addEventListener('input', (e) => {
    const keyword = e.target.value.toLowerCase();
    if (!keyword) {
      renderEquipmentList(equipmentData);
      return;
    }
    
    const filteredData = equipmentData.filter(item => {
      return (
        item.name.toLowerCase().includes(keyword) ||
        item.model.toLowerCase().includes(keyword) ||
        item.type.toLowerCase().includes(keyword) ||
        item.id.toLowerCase().includes(keyword)
      );
    });
    
    renderEquipmentList(filteredData);
  });
});

// 设置活动菜单项
function setActiveMenuItem() {
  const currentPage = window.location.pathname.split('/').pop();
  const menuItems = document.querySelectorAll('.sidebar-link');
  
  menuItems.forEach(item => {
    const itemPage = item.getAttribute('href');
    if (itemPage === currentPage) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

// 初始化筛选功能
function initializeFilters() {
  const filterButton = document.querySelector('.btn-primary');
  const resetButton = document.querySelector('.btn-primary + button');
  
  if (filterButton) {
    filterButton.addEventListener('click', function() {
      // 筛选逻辑
      console.log('筛选功能触发');
      alert('筛选功能尚在开发中。');
    });
  }
  
  if (resetButton) {
    resetButton.addEventListener('click', function() {
      // 重置筛选表单
      const filterInputs = document.querySelectorAll('.form-control');
      filterInputs.forEach(input => {
        if (input.tagName === 'SELECT') {
          input.selectedIndex = 0;
        } else {
          input.value = '';
        }
      });
    });
  }
}

// 初始化设备列表操作
function initializeEquipmentActions() {
  // 查看按钮点击事件
  const viewButtons = document.querySelectorAll('.btn-sm.bg-blue-50');
  viewButtons.forEach(button => {
    button.addEventListener('click', function() {
      // 获取当前行的设备ID
      const row = this.closest('tr');
      const equipmentId = row.querySelector('td:nth-child(3) div').textContent.trim();
      console.log('查看设备ID：', equipmentId);
      alert('查看设备详情：' + equipmentId);
    });
  });
  
  // 编辑按钮点击事件
  const editButtons = document.querySelectorAll('.btn-sm.bg-green-50');
  editButtons.forEach(button => {
    button.addEventListener('click', function() {
      const row = this.closest('tr');
      const equipmentId = row.querySelector('td:nth-child(3) div').textContent.trim();
      console.log('编辑设备ID：', equipmentId);
      alert('编辑设备信息：' + equipmentId);
    });
  });
  
  // 更多操作按钮点击事件
  const moreButtons = document.querySelectorAll('.btn-sm.bg-gray-50');
  moreButtons.forEach(button => {
    button.addEventListener('click', function() {
      const row = this.closest('tr');
      const equipmentId = row.querySelector('td:nth-child(3) div').textContent.trim();
      console.log('更多操作，设备ID：', equipmentId);
      
      // 这里可以显示下拉菜单或操作弹窗
      const options = ['下架设备', '安排维护', '查看历史订单', '删除设备'];
      const selectedOption = prompt('选择操作：\n1. 下架设备\n2. 安排维护\n3. 查看历史订单\n4. 删除设备', '');
      
      if (selectedOption && !isNaN(selectedOption)) {
        const index = parseInt(selectedOption) - 1;
        if (index >= 0 && index < options.length) {
          alert(`执行操作：${options[index]}，设备ID：${equipmentId}`);
        }
      }
    });
  });
  
  // 全选复选框
  const selectAllCheckbox = document.querySelector('thead th:first-child input[type="checkbox"]');
  if (selectAllCheckbox) {
    selectAllCheckbox.addEventListener('change', function() {
      const isChecked = this.checked;
      const itemCheckboxes = document.querySelectorAll('tbody td:first-child input[type="checkbox"]');
      
      itemCheckboxes.forEach(checkbox => {
        checkbox.checked = isChecked;
      });
    });
  }
}

// 初始化移动端侧边栏
function initializeMobileSidebar() {
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const mobileSidebar = document.getElementById('mobile-sidebar');
  const sidebarOverlay = document.getElementById('sidebar-overlay');
  
  if (sidebarToggle && mobileSidebar && sidebarOverlay) {
    sidebarToggle.addEventListener('click', function() {
      mobileSidebar.classList.toggle('-translate-x-full');
      sidebarOverlay.classList.toggle('hidden');
    });
    
    sidebarOverlay.addEventListener('click', function() {
      mobileSidebar.classList.add('-translate-x-full');
      sidebarOverlay.classList.add('hidden');
    });
  }
} 