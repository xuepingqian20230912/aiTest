// 登录表单处理
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const rememberMeCheckbox = document.getElementById('rememberMe');
    
    // 检查是否有保存的登录信息
    if (localStorage.getItem('rememberMe') === 'true') {
        const savedUsername = localStorage.getItem('savedUsername');
        if (savedUsername) {
            usernameInput.value = savedUsername;
            rememberMeCheckbox.checked = true;
        }
    }
    
    // 表单提交处理
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = usernameInput.value.trim();
        const password = passwordInput.value;
        const rememberMe = rememberMeCheckbox.checked;
        
        // 清除之前的错误信息
        clearErrors();
        
        // 基本验证
        if (!validateForm(username, password)) {
            return;
        }
        
        // 显示加载状态
        const submitButton = loginForm.querySelector('.login-button');
        const originalText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = '登录中...';
        
        // 模拟登录请求（实际项目中应该连接到后端 API）
        simulateLogin(username, password, rememberMe)
            .then(() => {
                // 登录成功
                showSuccess('登录成功！正在跳转...');
                
                // 如果选择了记住我，保存用户名
                if (rememberMe) {
                    localStorage.setItem('rememberMe', 'true');
                    localStorage.setItem('savedUsername', username);
                } else {
                    localStorage.removeItem('rememberMe');
                    localStorage.removeItem('savedUsername');
                }
                
                // 模拟跳转（实际项目中应该跳转到主页）
                setTimeout(() => {
                    alert('登录成功！\n用户名: ' + username + '\n\n（这是演示页面，实际项目中会跳转到主页）');
                    // window.location.href = '/dashboard'; // 实际跳转代码
                }, 1500);
            })
            .catch((error) => {
                // 登录失败
                showError(error.message);
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            });
    });
    
    // 实时验证
    usernameInput.addEventListener('blur', function() {
        validateUsername(usernameInput.value.trim());
    });
    
    passwordInput.addEventListener('blur', function() {
        validatePassword(passwordInput.value);
    });
});

// 表单验证
function validateForm(username, password) {
    let isValid = true;
    
    if (!validateUsername(username)) {
        isValid = false;
    }
    
    if (!validatePassword(password)) {
        isValid = false;
    }
    
    return isValid;
}

// 用户名验证
function validateUsername(username) {
    const formGroup = document.getElementById('username').closest('.form-group');
    
    if (!username) {
        showFieldError(formGroup, '请输入用户名');
        return false;
    }
    
    if (username.length < 3) {
        showFieldError(formGroup, '用户名至少需要3个字符');
        return false;
    }
    
    clearFieldError(formGroup);
    return true;
}

// 密码验证
function validatePassword(password) {
    const formGroup = document.getElementById('password').closest('.form-group');
    
    if (!password) {
        showFieldError(formGroup, '请输入密码');
        return false;
    }
    
    if (password.length < 6) {
        showFieldError(formGroup, '密码至少需要6个字符');
        return false;
    }
    
    clearFieldError(formGroup);
    return true;
}

// 显示字段错误
function showFieldError(formGroup, message) {
    formGroup.classList.add('error');
    
    let errorElement = formGroup.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        formGroup.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

// 清除字段错误
function clearFieldError(formGroup) {
    formGroup.classList.remove('error');
    const errorElement = formGroup.querySelector('.error-message');
    if (errorElement) {
        errorElement.classList.remove('show');
    }
}

// 清除所有错误
function clearErrors() {
    document.querySelectorAll('.form-group').forEach(group => {
        clearFieldError(group);
    });
    
    const successMessage = document.querySelector('.success-message');
    if (successMessage) {
        successMessage.classList.remove('show');
    }
}

// 显示错误消息
function showError(message) {
    clearErrors();
    
    // 创建或获取错误消息元素
    let errorElement = document.querySelector('.error-message.global');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message global';
        errorElement.style.cssText = 'background: #e74c3c; color: white; padding: 12px; border-radius: 8px; margin-bottom: 20px; text-align: center;';
        loginForm.insertBefore(errorElement, loginForm.firstChild);
    }
    
    errorElement.textContent = message;
    errorElement.classList.add('show');
    
    // 3秒后自动隐藏
    setTimeout(() => {
        errorElement.classList.remove('show');
    }, 3000);
}

// 显示成功消息
function showSuccess(message) {
    clearErrors();
    
    let successElement = document.querySelector('.success-message');
    if (!successElement) {
        successElement = document.createElement('div');
        successElement.className = 'success-message';
        loginForm.insertBefore(successElement, loginForm.firstChild);
    }
    
    successElement.textContent = message;
    successElement.classList.add('show');
}

// 模拟登录请求（实际项目中应该使用 fetch 或 axios 调用真实 API）
function simulateLogin(username, password, rememberMe) {
    return new Promise((resolve, reject) => {
        // 模拟网络延迟
        setTimeout(() => {
            // 演示用的简单验证（实际项目中应该调用后端 API）
            // 这里演示：用户名和密码都是 "admin" 时登录成功
            if (username === 'admin' && password === 'admin123') {
                resolve({ success: true, username });
            } else {
                reject(new Error('用户名或密码错误'));
            }
        }, 1000);
    });
}
