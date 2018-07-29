import $ from 'jquery';
import './lib/jquery.pagination';

function pagination(elem, options) {
    const config = {
        current_page: options.current,
        items_per_page: options.limit,
        page_index: 1,
        num_edge_entries: 1,
        num_display_entries: 5,
        prev_text: '&lt;',
        next_text: '&gt;',
        load_first_page: false,
        link_to: '#__id__',
        cut_limit_need: true,
        show_if_single_page: true,
        total_count_need: true
    };
    $.extend(config, options);
    $(elem).pagination(options.count, config);
}

export {
    pagination
};