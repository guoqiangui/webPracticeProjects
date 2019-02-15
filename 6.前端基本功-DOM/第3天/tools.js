/**
 * 根据id获取节点
 * @param id
 * @returns {HTMLElement}
 */
function getNode(id) {
    return document.getElementById(id);
}

/**
 * 获取下一个兄弟元素节点
 * @param ele
 * @returns {Element | Node | SVGElementInstance | ActiveX.IXMLDOMNode | (() => (Node | null))}
 */
function getNextNode(ele) {
    return ele.nextElementSibling || ele.nextSibling;
}

/**
 * 获取上一个兄弟元素节点
 * @param ele
 * @returns {Element | ActiveX.IXMLDOMNode | Node | SVGElementInstance | (() => (Node | null))}
 */
function getPreviousNode(ele) {
    return ele.previousElementSibling || ele.previousSibling;
}

/**
 * 获取第一个子元素节点
 * @param ele
 * @returns {Element | (() => (Node | null)) | Node | SVGElementInstance | ActiveX.IXMLDOMNode}
 */
function getFirstChildNode(ele) {
    return ele.firstElementChild || ele.firstChild;
}

/**
 * 获取最后一个子元素节点
 * @param ele
 * @returns {Element | ActiveX.IXMLDOMNode | Node | SVGElementInstance | (() => (Node | null))}
 */
function getLastChildNode(ele) {
    return ele.lastElementChild || ele.lastChild;
}

/**
 * 获取指定兄弟节点
 * @param ele
 * @param index
 * @returns {Element}
 */
function getSibNodeOfIndex(ele, index) {
    return ele.parentNode.children[index];
}

/**
 * 获取所有兄弟节点（不包括自己）
 * @param ele
 * @returns {Array}
 */
function getAllSibNodes(ele) {
    var newArr = [];
    var arr = ele.parentNode.children;
    for(var i=0;i<arr.length;i++) {
        if(arr[i] != ele) {
            newArr.push(arr[i]);
        }
    }
    return newArr;
}

