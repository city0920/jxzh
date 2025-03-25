// 通用JavaScript函数

// 设置页面标题
function setPageTitle(title) {
  document.title = title + ' - 机械租赁平台管理后台';
}

// 设置活动菜单项
function setActiveMenuItem(id) {
  const menuItems = document.querySelectorAll('.sidebar-link');
  menuItems.forEach(item => {
    item.classList.remove('active');
  });
  
  const activeItem = document.getElementById(id);
  if (activeItem) {
    activeItem.classList.add('active');
  }
}

// 显示消息通知
function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-icon">
      <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
    </div>
    <div class="notification-content">
      <p>${message}</p>
    </div>
    <button class="notification-close">
      <i class="fas fa-times"></i>
    </button>
  `;
  
  document.body.appendChild(notification);
  
  // 添加显示动画
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);
  
  // 自动关闭
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
  
  // 点击关闭按钮
  const closeBtn = notification.querySelector('.notification-close');
  closeBtn.addEventListener('click', () => {
    notification.classList.remove('show');
    setTimeout(() => {
      notification.remove();
    }, 300);
  });
}

// 格式化日期
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
}

// 格式化金额
function formatCurrency(amount) {
  return '¥' + parseFloat(amount).toFixed(2);
}

// 创建数据表格分页
function createPagination(totalItems, itemsPerPage, currentPage, onPageChange) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginationElement = document.createElement('div');
  paginationElement.className = 'pagination';
  
  // 上一页按钮
  const prevButton = document.createElement('button');
  prevButton.className = `pagination-btn ${currentPage === 1 ? 'disabled' : ''}`;
  prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
  prevButton.disabled = currentPage === 1;
  prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  });
  
  // 页码按钮
  const pageButtons = [];
  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement('button');
    pageButton.className = `pagination-btn ${i === currentPage ? 'active' : ''}`;
    pageButton.textContent = i;
    pageButton.addEventListener('click', () => {
      if (i !== currentPage) {
        onPageChange(i);
      }
    });
    pageButtons.push(pageButton);
  }
  
  // 下一页按钮
  const nextButton = document.createElement('button');
  nextButton.className = `pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`;
  nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
  nextButton.disabled = currentPage === totalPages;
  nextButton.addEventListener('click', () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  });
  
  // 组装分页元素
  paginationElement.appendChild(prevButton);
  pageButtons.forEach(button => {
    paginationElement.appendChild(button);
  });
  paginationElement.appendChild(nextButton);
  
  return paginationElement;
}

// 表单验证
function validateForm(formId, rules) {
  const form = document.getElementById(formId);
  const inputs = form.querySelectorAll('input, select, textarea');
  let isValid = true;
  
  inputs.forEach(input => {
    const rule = rules[input.name];
    if (!rule) return;
    
    const errorElement = document.createElement('div');
    errorElement.className = 'form-error';
    
    // 移除现有错误信息
    const existingError = input.parentNode.querySelector('.form-error');
    if (existingError) {
      existingError.remove();
    }
    
    // 验证必填项
    if (rule.required && !input.value.trim()) {
      errorElement.textContent = rule.requiredMessage || '此字段为必填项';
      input.parentNode.appendChild(errorElement);
      isValid = false;
    }
    
    // 验证最小长度
    if (rule.minLength && input.value.length < rule.minLength) {
      errorElement.textContent = rule.minLengthMessage || `最少需要${rule.minLength}个字符`;
      input.parentNode.appendChild(errorElement);
      isValid = false;
    }
    
    // 验证正则表达式
    if (rule.pattern && !rule.pattern.test(input.value)) {
      errorElement.textContent = rule.patternMessage || '格式不正确';
      input.parentNode.appendChild(errorElement);
      isValid = false;
    }
    
    // 自定义验证
    if (rule.validate && !rule.validate(input.value)) {
      errorElement.textContent = rule.validateMessage || '验证失败';
      input.parentNode.appendChild(errorElement);
      isValid = false;
    }
  });
  
  return isValid;
}

// 公共JavaScript脚本

document.addEventListener('DOMContentLoaded', function() {
  // 初始化移动端侧边栏
  initializeMobileSidebar();
  
  // 初始化用户下拉菜单
  initializeUserDropdown();
  
  // 获取当前用户信息
  fetchCurrentUser();
});

// 初始化移动端侧边栏
function initializeMobileSidebar() {
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const mobileSidebar = document.getElementById('mobile-sidebar');
  const sidebarOverlay = document.getElementById('sidebar-overlay');
  
  if (!sidebarToggle || !mobileSidebar || !sidebarOverlay) return;
  
  // 复制主侧边栏内容到移动端侧边栏
  const mainSidebar = document.querySelector('.sidebar');
  if (mainSidebar) {
    mobileSidebar.innerHTML = mainSidebar.innerHTML;
  }
  
  // 切换侧边栏显示/隐藏
  sidebarToggle.addEventListener('click', function() {
    mobileSidebar.classList.toggle('-translate-x-full');
    sidebarOverlay.classList.toggle('hidden');
  });
  
  // 点击遮罩关闭侧边栏
  sidebarOverlay.addEventListener('click', function() {
    mobileSidebar.classList.add('-translate-x-full');
    sidebarOverlay.classList.add('hidden');
  });
}

// 初始化用户下拉菜单
function initializeUserDropdown() {
  const userDropdown = document.querySelector('.hidden.md\\:block.relative');
  
  if (!userDropdown) return;
  
  userDropdown.addEventListener('click', function(e) {
    e.stopPropagation();
    
    // 创建或切换下拉菜单
    let dropdown = document.getElementById('user-dropdown');
    
    if (dropdown) {
      dropdown.classList.toggle('hidden');
    } else {
      dropdown = document.createElement('div');
      dropdown.id = 'user-dropdown';
      dropdown.className = 'absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20';
      dropdown.style.top = '100%';
      
      // 下拉菜单选项
      dropdown.innerHTML = `
        <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">个人资料</a>
        <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">账户设置</a>
        <div class="border-t border-gray-100 my-1"></div>
        <a href="login.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">退出登录</a>
      `;
      
      userDropdown.appendChild(dropdown);
    }
    
    // 点击页面其他地方关闭下拉菜单
    document.addEventListener('click', function closeDropdown(e) {
      if (!dropdown.contains(e.target) && !userDropdown.contains(e.target)) {
        dropdown.classList.add('hidden');
        document.removeEventListener('click', closeDropdown);
      }
    });
  });
}

// 获取当前用户信息
function fetchCurrentUser() {
  // 模拟从API获取用户信息
  const userInfo = {
    name: '管理员',
    role: '系统管理员',
    avatar: null
  };
  
  // 更新用户名称显示
  const userNameElements = document.querySelectorAll('.user-name');
  userNameElements.forEach(element => {
    element.textContent = userInfo.name;
  });
} 